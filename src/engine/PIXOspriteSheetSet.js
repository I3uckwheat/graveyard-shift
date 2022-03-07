import * as PIXI from "pixi.js";

export class PIXOspriteSheetSet {
  #spriteSheets = [];
  #gidRanges = [];

  constructor(spriteSheetsData = []) {
    // spriteSheetsData: [{gidRange: [num, num], sheet: PIXOtileSet}, ...]

    for(let sheetData of spriteSheetsData) {
      if(!sheetData.gidRange || !sheetData.sheet) throw new Error("Missing gid or sheet passed to PIXOspriteSheetSet");
      this.#gidRanges.push(sheetData.gidRange);
      this.#spriteSheets.push(sheetData.sheet);
    }
  }

  get(gid) {
    if(gid < 0) throw new Error("PIXOspriteSheetSets start at a gid of 0");
    if(gid == 0) return new PIXI.Sprite();

    const spriteSheetIndex = this.#gidRanges.findIndex(([a, b]) => {
      const min = Math.min(a, b);
      const max = Math.max(a, b);

      // Inclusive between
      return gid >= min && gid <= max;
    });

    if(spriteSheetIndex < 0) throw new Error("Sprite not found");

    const sheet = this.#spriteSheets[spriteSheetIndex];
    const sheetGid = gid - Math.min(...this.#gidRanges[spriteSheetIndex]); 
    return sheet.get(sheetGid);
  }
}
