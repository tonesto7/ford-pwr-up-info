const chgs = ["Minor adjustments[41]", "Some camera views are now available while the vehicle is in motion[42]", "Added Picture-in-Picture capability to the Trailer Reverse Guidance feature", "Updated SYNC to Software Version: 22034_PRODUCT Revision: 364(2.5.3)[43]", "Updated SYNC to Software Version: 22095_PRODUCT Revision: 421(2.8.3)"];

let chgsOut = [];
for (let [i, chg] of chgs.entries()) {
    chg = chg + ".";
    chg = chg.replace(/(\[\d{2,2}\])/g, "").replace("..", ".");
    chgsOut.push({ link: "", linkText: "", text: chg, models: [] });
}

console.log(JSON.stringify(chgsOut, null, 2));
