import { Guns, SkinsType } from "@resources/loadout";

function changeGunSkin<T extends Guns>(weapon: T, skins: SkinsType<T>): void {
    console.log(weapon);
    console.log(skins);
    return;
}

export { changeGunSkin };
