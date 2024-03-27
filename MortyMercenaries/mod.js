//===============//
//   Constants   //
//===============//

class FileConstants {
  // extensions
  static FILE_EXTENSION_JSON = ".json";

  // localized jsons
  static PATH_LOCAL_LNG_STRINGS = "local\\lng\\strings\\";
  static FILE_VO_JSON           = `${this.PATH_LOCAL_LNG_STRINGS}vo${this.FILE_EXTENSION_JSON}`;
  static FILE_MERCENARIES_JSON  = `${this.PATH_LOCAL_LNG_STRINGS}mercenaries${this.FILE_EXTENSION_JSON}`;

  static PATH_MOD_SFX_GLOBAL = "data\\sfx_global";
  static PATH_MOD_SFX_HD     = "data\\sfx_hd";
  static PATH_MOD_SFX_LOCAL  = "data\\sfx_local";
  static PATH_MOD_SPRITES    = "data\\sprites";

  static PATH_GAME_SFX_GLOBAL = "local\\sfx\\common\\hireables";
  static PATH_GAME_SFX_HD     = "hd\\global\\sfx\\monster";
  static PATH_GAME_SFX_LOCAL  = "global\\sfx\\monster";
  static PATH_GAME_SPRITES    = "hd\\global\\ui\\hireables";

  static jsonProperties = {
      id:   "id",
     key:  "Key",
    enus: "enUS",
    zhtw: "zhTW",
    dede: "deDE",
    eses: "esES",
    frfr: "frFR",
    itit: "itIT",
    kokr: "koKR",
    plpl: "plPL",
    esmx: "esMX",
    jajp: "jaJP",
    ptbr: "ptBR",
    ruru: "ruRU",
    zhcn: "zhCN",
  };
}
  
class ModConstants {
  static mercNames = {
    latin:    "Morty",
    chinese:  "莫蒂",
    korean:   "모티",
    japanese: "モーティ",
    cyrillic: "Морти",
  };

  static subtitles = {
    textPotion: "Thanks.",
    keysPotion: [
      "female_thankyou", 
      "male_thankyou1", 
      "male_thankyou2", 
      "male_thankyou3",
    ],
    textNewEquip: "Thanks, Rick.",
    keysNewEquip: [
      "female_illputthattogooduse", 
      "male_illputthattogooduse1", 
      "male_illputthattogooduse2", 
      "male_illputthattogooduse3",
    ],
  };
}

class MortyMercenariesMod {
  build() {
    if (config.shouldRenameMercenary) {
      this.renameMercenary();
    }

    if (config.shouldReplaceMercenarySprites) {
      this.replaceSprites();
    }

    if (config.shouldReplaceMercenarySfx) {
      this.replaceSfx();
      this.replaceSubtitles();
    }
  }

  renameMercenary() {
    let path = FileConstants.FILE_MERCENARIES_JSON;
    let file = D2RMM.readJson(path);

    file.forEach(entry => {
      let shouldUseCustomName = (config.mercenaryName != null && config.mercenaryName !== "");
      entry[FileConstants.jsonProperties.enus] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.zhtw] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.chinese;
      entry[FileConstants.jsonProperties.dede] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.eses] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.frfr] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.itit] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.kokr] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.korean;
      entry[FileConstants.jsonProperties.plpl] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.esmx] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.jajp] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.japanese;
      entry[FileConstants.jsonProperties.ptbr] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.latin;
      entry[FileConstants.jsonProperties.ruru] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.cyrillic;
      entry[FileConstants.jsonProperties.zhcn] = shouldUseCustomName ? config.mercenaryName : ModConstants.mercNames.chinese;
    });
    
    D2RMM.writeJson(path, file);
  }

  replaceSprites() {
    D2RMM.copyFile(FileConstants.PATH_MOD_SPRITES, FileConstants.PATH_GAME_SPRITES, true); // copy <mod folder>\sprites contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\ui\hireables
  }

  replaceSfx() {
    // TODO: "I can't use that (yet)" contenders:
    // - Lawnmower Dog - Morty: Oh, man, Rick, this is pretty weird.
    // - Meeseeks and Destroy - Morty: I can’t do it, Rick! They’re my parents and sister! 
    // - Rick Potion #9 - Morty: Heck yeah! Thank you, Grandpa Rick! (walks to the door, but thinks about it and looks back) Hey there's no dangers or anything or side effects, right?
    // - Rick Potion #9 - Morty: Oh, Rick, something's not right. 
    // - The Jerrick Trap - Morty: I'm telling you, man, you're making a big mistake here. 
    // - Rickfending Your Mort - Morty: Nope. I'm good. 

    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_LOCAL,  FileConstants.PATH_GAME_SFX_GLOBAL, true); // copy <mod folder>\sfx_local  contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\local\sfx\common\hireables
    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_HD,     FileConstants.PATH_GAME_SFX_HD,     true); // copy <mod folder>\sfx_hd     contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\sfx\monster
    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_GLOBAL, FileConstants.PATH_GAME_SFX_LOCAL,  true); // copy <mod folder>\sfx_global contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\global\sfx\monster
  }

  replaceSubtitles() {
    let path = FileConstants.FILE_VO_JSON;
    let file = D2RMM.readJson(path);

    file.forEach(entry => {
      if (ModConstants.subtitles.keysNewEquip.includes(entry[FileConstants.jsonProperties.key])) {
        this.replaceSubtitle(entry, ModConstants.subtitles.textNewEquip);
        return;
      }
      if (ModConstants.subtitles.keysPotion.includes(entry[FileConstants.jsonProperties.key])) {
        this.replaceSubtitle(entry, ModConstants.subtitles.textPotion);
        return;
      }
    });

    D2RMM.writeJson(path, file);
  }

  replaceSubtitle(entry, newText) {
    entry[FileConstants.jsonProperties.enus] = newText;
    entry[FileConstants.jsonProperties.zhtw] = newText;
    entry[FileConstants.jsonProperties.dede] = newText;
    entry[FileConstants.jsonProperties.eses] = newText;
    entry[FileConstants.jsonProperties.frfr] = newText;
    entry[FileConstants.jsonProperties.itit] = newText;
    entry[FileConstants.jsonProperties.kokr] = newText;
    entry[FileConstants.jsonProperties.plpl] = newText;
    entry[FileConstants.jsonProperties.esmx] = newText;
    entry[FileConstants.jsonProperties.jajp] = newText;
    entry[FileConstants.jsonProperties.ptbr] = newText;
    entry[FileConstants.jsonProperties.ruru] = newText;
    entry[FileConstants.jsonProperties.zhcn] = newText;
  }
}

(new MortyMercenariesMod()).build();
