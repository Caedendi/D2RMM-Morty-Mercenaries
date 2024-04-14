class FileConstants {
  static FILE_EXTENSION_JSON = ".json";

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

  static FILE_ACT2HIRE_JSON = `hd\\character\\enemy\\act2hire${this.FILE_EXTENSION_JSON}`;
  static FILE_KAELAN_JSON = `hd\\character\\npc\\act2guard2${this.FILE_EXTENSION_JSON}`;
  
  static FILE_ACT2HIRE_STATE_MACHINE_JSON = `hd\\character\\enemy\\act2hire\\act2hire_state_machine${FileConstants.FILE_EXTENSION_JSON}`;
  static FILE_KAELAN_STATE_MACHINE_JSON = `hd\\character\\npc\\act2guard2\\act2guard2_state_machine${FileConstants.FILE_EXTENSION_JSON}`;

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
      componentRootStateMachine: `data/hd/character/enemy/act2hire_state_machine${FileConstants.FILE_EXTENSION_JSON}`,
      sequenceAnimation: {
        type: "AnimationItem",
        name: "sequence",
        filename: `data/hd/character/npc/act2guard2/animation/sequence.animation`,
      },
      jabSequenceState: {
        type: "AnimationState",
        name: "State_sequence",
        _name: "Jab_Sequence",
        audioId: "",
        loopCount: 1,
        stateId: 14,
        modeId: 14,
        skillIndex: 10,
        stepIndex: 0,
        animationBindings: {
            hth: [
                "sequence"
            ]
        },
        enterEvents: [],
        exitEvents: []
      },
    }
  };
}

class MortyMercenariesMod {
  build() {
    if (config.shouldReplaceMercenarySfx) {
      this.replaceSfx();
      this.replaceSubtitles();
    }

    if (config.shouldReplaceMercenarySprites) {
      this.replaceSprites();
    }

    if (config.shouldRenameMercenary) {
      this.renameMercenary();
    }

    if (config.shouldUseKaelanModel) {
      this.replaceModels();
    }
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

  replaceSprites() {
    D2RMM.copyFile(FileConstants.PATH_MOD_SPRITES,    FileConstants.PATH_GAME_SPRITES,    true); // copy <mod folder>\sprites    contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\ui\hireables
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

  replaceModels() {
    this.replaceAct2Hire();
    this.replaceAct2HireStateMachine();
  }

  replaceAct2Hire() {
    let path = FileConstants.FILE_ACT2HIRE_JSON;

    let kaelan = D2RMM.readJson(FileConstants.FILE_KAELAN_JSON);
    let kaelanCopy = { ...(kaelan) };
    kaelanCopy.entities
      .find(entity => entity.name === "entity_root")
      .components
      .find(component => component.name === "component_root")
      .state_machine_filename = ModConstants.models.act2hire.componentRootStateMachine;
    
    D2RMM.writeJson(path, kaelanCopy);
  }

  replaceAct2HireStateMachine() {
    let path = FileConstants.FILE_ACT2HIRE_STATE_MACHINE_JSON;

    let kaelan = D2RMM.readJson(FileConstants.FILE_KAELAN_STATE_MACHINE_JSON);
    let kaelanCopy = { ...(kaelan) };

    // insert sequence animation
    let skill4_i = kaelanCopy.animations.findIndex(animation => animation.name === "skill4");
    kaelanCopy.animations.splice(skill4_i, 0, ModConstants.models.act2hire.sequenceAnimation);

    // insert jab sequence state
    let knockback_i = kaelanCopy.states.findIndex(state => state.name === "State_Knockback");
    kaelanCopy.states.splice(knockback_i, 0, ModConstants.models.act2hire.jabSequenceState);

    // correct state IDs
    kaelanCopy.states.forEach(state => {
      if (state.stateId < knockback_i) {
        return;
      }

      state.stateId = knockback_i++;
    });

    D2RMM.writeJson(path, kaelanCopy);
  }
}

(new MortyMercenariesMod()).build();
