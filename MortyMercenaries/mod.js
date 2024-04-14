class FileConstants {
  static FILE_EXTENSION_JSON      = ".json";
  static FILE_EXTENSION_ANIMATION = ".animation";

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
  
  static FILE_ACT2HIRE_STATE_MACHINE_JSON = `hd\\character\\enemy\\act2hire\\act2hire_state_machine${this.FILE_EXTENSION_JSON}`;
  static FILE_KAELAN_STATE_MACHINE_JSON   = `hd\\character\\npc\\act2guard2\\act2guard2_state_machine${this.FILE_EXTENSION_JSON}`;

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

class ReferenceConstants {
  static PATH_DATA_HD_CHAR = `data/hd/character/`;
  static PATH_DATA_HD_CHAR_NPC_A2GUARD = `${this.PATH_DATA_HD_CHAR}npc/act2guard2/`;
  static PATH_ACT2GUARD2_ANIMATION = `${this.PATH_DATA_HD_CHAR_NPC_A2GUARD}animation/`;

  static walkAnimation     = `${this.PATH_ACT2GUARD2_ANIMATION}walk${FileConstants.FILE_EXTENSION_ANIMATION}`;
  static runAnimation      = `${this.PATH_ACT2GUARD2_ANIMATION}run${FileConstants.FILE_EXTENSION_ANIMATION}`;
  static sequenceAnimation = `${this.PATH_ACT2GUARD2_ANIMATION}sequence${FileConstants.FILE_EXTENSION_ANIMATION}`;

  static act2hireStateMachine = `${this.PATH_DATA_HD_CHAR}enemy/act2hire/act2hire_state_machine${FileConstants.FILE_EXTENSION_JSON}`
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
      componentRootStateMachine: ReferenceConstants.act2hireStateMachine,
      sequenceAnimation: {
        type: "AnimationItem",
        name: "sequence",
        filename: ReferenceConstants.sequenceAnimation,
      },
      jabSequenceState: {
        type: "AnimationState",
        name: "State_sequence",
        _name: "Jab_Sequence",
        audioId: "",
        loopCount: 1,
        stateId: 0,
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
      runAnimation: ReferenceConstants.walkAnimation,
      walkAnimation: ReferenceConstants.runAnimation,
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

      if (config.shouldModifyScale) {
        this.modifyScale();
      }
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
      this.replaceSubtitle(entry, ModConstants.subtitles.keysPotion,    ModConstants.subtitles.textPotion);    // replace "Thanks." / "Thank you."     with Morty's "Thanks."
      this.replaceSubtitle(entry, ModConstants.subtitles.keysNewEquip,  ModConstants.subtitles.textNewEquip);  // replace "I'll put that to good use." with Morty's "Thanks, Rick."
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
    D2RMM.copyFile(FileConstants.PATH_MOD_SPRITES, FileConstants.PATH_GAME_SPRITES, true); // copy <mod folder>\sprites contents to <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd\global\ui\hireables
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
    let temp = D2RMM.readJson(path); // apparently we need to read a file first if we want to write to it, even if we don't use its contents

    let kaelan = D2RMM.readJson(FileConstants.FILE_KAELAN_JSON);
    let kaelanCopy = { ...(kaelan) };

    // set state machine path
    kaelanCopy.entities
      .find(entity => entity.name === "entity_root")
      .components
      .find(component => component.name === "component_root")
      .state_machine_filename = ModConstants.models.act2hire.componentRootStateMachine;
    
    D2RMM.writeJson(path, kaelanCopy);
  }

  replaceAct2HireStateMachine() {
    let path = FileConstants.FILE_ACT2HIRE_STATE_MACHINE_JSON;
    let temp = D2RMM.readJson(path); // apparently we need to read a file first if we want to write to it, even if we don't use its contents

    let kaelan = D2RMM.readJson(FileConstants.FILE_KAELAN_STATE_MACHINE_JSON);
    let kaelanCopy = { ...(kaelan) };

    // insert sequence animation
    let newAnimationId = kaelanCopy.animations.findIndex(animation => animation.name === "skill4") + 1;
    kaelanCopy.animations.splice(newAnimationId, 0, ModConstants.models.act2hire.sequenceAnimation);

    // insert jab sequence state
    let newStateId = kaelanCopy.states.findIndex(state => state.name === "State_Knockback") + 1;
    kaelanCopy.states.splice(newStateId, 0, ModConstants.models.act2hire.jabSequenceState);
    kaelanCopy.states[newStateId].stateId = newStateId;
    newStateId++;

    // correct state IDs
    for (let i = newStateId; i < kaelanCopy.states.length; i++) {
      kaelanCopy.states[i].stateId = i;
    }

    // switch run/walk animations
    this.replaceAnimationFilename(kaelanCopy, "walk", ModConstants.models.act2hire.runAnimation);
    this.replaceAnimationFilename(kaelanCopy, "run", ModConstants.models.act2hire.walkAnimation);

    D2RMM.writeJson(path, kaelanCopy);
  }

  replaceAnimationFilename(file, animationName, newFilename) {
    file.animations
      .find(animation => animation.name === animationName)
      .filename = newFilename;
  }

  modifyScale() {
    let path = FileConstants.FILE_ACT2HIRE_JSON;
    let file = D2RMM.readJson(path);

    file.entities
      .find(entity => entity.name === "entity_root")
      .components
      .find(component => component.name === "entity_root_TransformDefinition")
      .scale = { 
        x: config.ScaleX,
        y: config.ScaleY,
        z: config.ScaleZ,
      };

    D2RMM.writeJson(path, file);
  }
}

(new MortyMercenariesMod()).build();
