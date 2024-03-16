// ==UserScript==
// @name        WaniKani Transitivity Pair Information
// @version     0.200
// @author      thymemanagement
// @description Provides details on existing transitivity pairs within WaniKani
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace   wk_trans
//
// @match       https://www.wanikani.com/*
// @match       https://preview.wanikani.com/*
//
// @updateURL   https://github.com/thymemanagement/Transitivity-Pair-Userscript/blob/main/transitivity_pair_information.user.js
// @downloadURL https://github.com/thymemanagement/Transitivity-Pair-Userscript/blob/main/transitivity_pair_information.user.js
//
// @require     https://greasyfork.org/scripts/430565-wanikani-item-info-injector/code/WaniKani%20Item%20Info%20Injector.user.js?version=1326536
// @require     https://raw.githubusercontent.com/thymemanagement/Transitivity-Pair-Userscript/main/transitivity_pairs.json 
//
// @run-at      document-end
//
// @grant       none
//
// ==/UserScript==

function transCreateInfoSection(word) {
    const transData = TRANS_PAIRS[word]
    const p = document.createElement('p')
    if (transData === undefined) {
        p.innerHTML = "No Pair"
    } else {
        let p1 = ""
        if (transData.transitivity = "transitive") {
            p1 = "<div>" + transData.pair_type + ": *" + word + "* (他) vs " + transData.pair + " (自)</div>"
        } else {
            p1 = "<div>" + transData.pair_type + ": " + transData.pair + " (他) vs *" + word + "* (自)</div>"
        }
        let p2 = ""
        if (transData.pair_type === "exception") {
            p2 = "This transitivity pair is an exception and doesn't follow any patterns. In this case " + word + " is the " + transData.transitivity + " pair."
        } else if (transData.pair_type === "う pair") {
            if (transData.base === "く") {
                p2 = "This transitivity pair follows an う vs える pattern. Since it's base is く, either pair could be transitive or intransitive. In this case " + word 
                + " is the " + transData.transitivity + " pair."
            } else if (transData.base === "る") {
                if (word === "入る" || transData.pair === "入る") {
                    p2 = "This transitivity pair follows an う vs える pattern. It's base is る, however these two verbs are an exception. 入る is intransitive and 入れる is transitive."
                } else {
                    p2 = "This transitivity pair follows an う vs える pattern. Since it's base is る, the verb ending in る is transitive and the verb ending in れる is intransitive."
                }
            } else {
                p2 = "This transitivity pair follows an う vs える pattern. Since it's base is " + transData.base + ", the verb ending in the う sound is intransitive and the verb ending in える is transitive."
            }
        } else if (transData.pair_type === "ある pair") {
            if (transData.pattern === "exception") {
                p2 = "This transitivity pair is an exception but thankfully it follows an ある vs える pattern. 捕まる is intransitive and 捕える is transitive just like all other ある pairs."
            } else if (transData.pattern.contains("う")) {
                p2 = "This transitivity pair follows an " + transData.pattern + " pattern. The verb ending with an う sound will be transitive and the verb ending with る will be intransitive."
            } else {
                p2 = "This transitivity pair follows an " + transData.pattern + " pattern. The verb ending in an える sound will be transitive and the verb ending with an ある sound will be intransitive."
            }
        } else {
            if (transData.pattern === "exception") {
                p2 = "This transitivity pair follows no known pattern but it does follow the rules of す pairs. The verb ending with す will be transitive and the verb not ending in す will be intransitive."
            } else if (transData.pattern.contains("せる")) {
                p2 = "This transitivity pair follows a " + transData.pattern + " pattern. The verb ending in せる will be transitive and the verb not ending in せる will be intransitive."
            } else {
                p2 = "This transitivity pair follows a " + transData.pattern + " pattern. The verb ending in す will be transitive and the verb not ending in す will be intransitive."
            }
        }
        p.innerHTML = p1 + "<div>" + p2 + "</div>"
    }
    return p
}

wkItemInfo.forType('vocabulary').under('meaning').appendSubsection('Transitivity Pair', o => transCreateInfoSection(o.characters))