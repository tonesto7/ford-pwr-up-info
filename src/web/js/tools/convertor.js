const chgs = [
    "Adds ability to enter your vehicle using your Key Fob during a non-drivable update",
    "You'll now receive new pop-up alerts to inform you when a precondition is not being met so that you can take the required action to receive your update. For a non-drivable update, preconditions may include that your vehicle is parked, it's not running, all the lights are off, doors and trunk are closed, and you're not pressing the brake pedal.[13]",
];

let chgsOut = [];
for (let [i, chg] of chgs.entries()) {
    chg = chg + ".";
    chg = chg.replace(/(\[\d{2,2}\])/g, "").replace("..", ".");
    chgsOut.push({ link: "", linkText: "", text: chg, models: [] });
}

console.log(JSON.stringify(chgsOut, null, 2));
