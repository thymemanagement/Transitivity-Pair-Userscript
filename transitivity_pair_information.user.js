// ==UserScript==
// @name        WaniKani Transitivity Pair Information
// @version     0.100
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
        if (transData.transitivity = "transitive") {
            p.innerHTML = transData.pair_type + "<br>" + word + " vs " + transData.pair + "<br>" + word + " is the transitive pair. It has the pattern " + transData.pattern + " with the base " + transData.base + "."
        } else {
            p.innerHTML = transData.pair_type + "<br>" + transData.pair + " vs " + word + "<br>" + word + " is the intransitive pair. It has the pattern " + transData.pattern + " with the base " + transData.base + "."
        }
    }
    return p
}

wkItemInfo.forType('vocabulary').under('meaning').appendSubsection('Transitivity Pair', o => transCreateInfoSection(o.characters))