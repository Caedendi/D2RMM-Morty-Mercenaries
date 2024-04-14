class FileConstants {
  static FILE_EXTENSION_JSON = ".json";
  static FILE_EXTENSION_MODEL = ".model";
  static FILE_EXTENSION_TEXTURE = ".texture";

  static PATH_LOCAL_LNG_STRINGS = "local\\lng\\strings\\";
  static FILE_VO_JSON           = `${this.PATH_LOCAL_LNG_STRINGS}vo${this.FILE_EXTENSION_JSON}`;
  static FILE_MERCENARIES_JSON  = `${this.PATH_LOCAL_LNG_STRINGS}mercenaries${this.FILE_EXTENSION_JSON}`;

  static PATH_MOD_SFX_GLOBAL = "data\\sfx_global";
  static PATH_MOD_SFX_HD     = "data\\sfx_hd";
  static PATH_MOD_SFX_LOCAL  = "data\\sfx_local";
  static PATH_MOD_SPRITES    = "data\\sprites";

  static PATH_GAME_SFX_GLOBAL = "global\\sfx\\monster";
  static PATH_GAME_SFX_HD     = "hd\\global\\sfx\\monster";
  static PATH_GAME_SFX_LOCAL  = "local\\sfx\\common\\hireables";
  static PATH_GAME_SPRITES    = "hd\\global\\ui\\hireables";

  static PATH_DATA_HD                              = `data/hd/`;
  static PATH_DATA_HD_CHAR_NPC_ACT2GUARD2          = `${this.PATH_DATA_HD}character/npc/act2guard2/`;
  static PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES = `${this.PATH_DATA_HD_CHAR_NPC_ACT2GUARD2}textures/`;
  static PATH_DATA_HD_CHAR_COMMON                  = `${this.PATH_DATA_HD}character/common/`;
  static PATH_DATA_HD_ITEMS_WEAPON                 = `${this.PATH_DATA_HD}items/weapon/`

  static jsonProperties = {
      id: "id",
     key: "Key",
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
    textCantEquip: "Oh, Rick, something's not right.",
    keysCantEquip: [
      "female_icantusethat",
      "female_icantusethatyet",
      "male_icantusethat1",
      "male_icantusethat2",
      "male_icantusethat3",
      "male_icantusethatyet1",
      "male_icantusethatyet2",
      "male_icantusethatyet3",
    ],
  };

  static models = {
    act2hire: {
      dependencies: {
        modelPaths: [
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}head_lit${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}head_med${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}larm_lit${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}larm_med${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}legs_lit${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}legs_med${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}rarm_lit${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}rarm_med${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}rhand_glv${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}rhand_spr${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}special1${FILE_EXTENSION_MODEL}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}torso_lit${FILE_EXTENSION_MODEL}`,
        ],
        skeletonPath: `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD}skeleton/act2guard2.skeleton`,
        texturePaths: [
          `${PATH_DATA_HD_CHAR_COMMON}common_hair2_ALB${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_COMMON}common_hair2_FLOW${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_COMMON}common_hair2_HRT${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_COMMON}common_ktint${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_armor_alb${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_armor_nrm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_armor_orm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_body_alb${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_body_nrm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_body_orm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_body_SSS${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_head_alb${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_head_nrm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_head_orm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_head_SSS${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_sword_alb${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_sword_nrm${FILE_EXTENSION_TEXTURE}`,
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2_TEXTURES}kaelan_sword_orm${FILE_EXTENSION_TEXTURE}`,
        ],
        jsonPaths: [
          `${PATH_DATA_HD_CHAR_NPC_ACT2GUARD2}act2guard2_state_machine${FILE_EXTENSION_JSON}`,
          `${PATH_DATA_HD_ITEMS_WEAPON}polearm/war_scythe${FILE_EXTENSION_JSON}`,
          `${PATH_DATA_HD_ITEMS_WEAPON}spear/_monsters/kaelan_spear${FILE_EXTENSION_JSON}`,
        ]
      },
      name: `act2guard2`,
    }
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

    if (config.shouldUseKaelanModel) {
      this.replaceModels();
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
    D2RMM.copyFile(FileConstants.PATH_MOD_SPRITES,    FileConstants.PATH_GAME_SPRITES,    true); // copy <mod folder>\sprites    contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\ui\hireables
  }

  replaceSfx() {
    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_LOCAL,  FileConstants.PATH_GAME_SFX_LOCAL,  true); // copy <mod folder>\sfx_local  contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\local\sfx\common\hireables
    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_HD,     FileConstants.PATH_GAME_SFX_HD,     true); // copy <mod folder>\sfx_hd     contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\sfx\monster
    D2RMM.copyFile(FileConstants.PATH_MOD_SFX_GLOBAL, FileConstants.PATH_GAME_SFX_GLOBAL, true); // copy <mod folder>\sfx_global contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\global\sfx\monster
  }

  replaceSubtitles() {
    let path = FileConstants.FILE_VO_JSON;
    let file = D2RMM.readJson(path);

    file.forEach(entry => {
      this.replaceSubtitle(entry, ModConstants.subtitles.keysPotion, ModConstants.subtitles.textPotion);       // replace "Thanks." / "Thank you."     with Morty's "Thanks."
      this.replaceSubtitle(entry, ModConstants.subtitles.keysNewEquip, ModConstants.subtitles.textNewEquip);   // replace "I'll put that to good use." with Morty's "Thanks, Rick."
      this.replaceSubtitle(entry, ModConstants.subtitles.keysCantEquip, ModConstants.subtitles.textCantEquip); // replace "I can't use that (yet)."    with Morty's "Oh, Rick, something's not right."
    });

    D2RMM.writeJson(path, file);
  }

  replaceSubtitle(entry, keys, newText) {
    if (keys.includes(entry[FileConstants.jsonProperties.key])) { // if entry.Key matches with one of the entries in keys
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

  replaceModels() {
    // do stuff

    // act2hire.json
    // variantdata = [];
  }
}

(new MortyMercenariesMod()).build();