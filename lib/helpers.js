(function() {
  var AtomModifierRegex, AtomModifiers, ExactMatch, KeyboardEventModifiers, KeydownExactMatch, LowerCaseLetterRegex, NumPadToASCII, PartialMatch, UpperCaseLetterRegex, WhitespaceRegex, WindowsAndLinuxCharCodeTranslations, WindowsAndLinuxKeyIdentifierTranslations, calculateSpecificity, charCodeFromKeyIdentifier, isASCII, keyForKeyboardEvent, keyFromCharCode, keyboardEvent, modifier, normalizeKeystroke, numpadToASCII, parseKeystroke, translateCharCodeForWindowsAndLinuxChromiumBug, translateKeyIdentifierForWindowsAndLinuxChromiumBug, _i, _j, _len, _len1, _ref, _ref1;

  calculateSpecificity = require('clear-cut').calculateSpecificity;

  AtomModifiers = new Set;

  _ref = ['ctrl', 'alt', 'shift', 'cmd'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    modifier = _ref[_i];
    AtomModifiers.add(modifier);
  }

  AtomModifierRegex = /(ctrl|alt|shift|cmd)$/;

  WhitespaceRegex = /\s+/;

  LowerCaseLetterRegex = /^[a-z]$/;

  UpperCaseLetterRegex = /^[A-Z]$/;

  ExactMatch = 'exact';

  KeydownExactMatch = 'keydownExact';

  PartialMatch = 'partial';

  KeyboardEventModifiers = new Set;

  _ref1 = ['Control', 'Alt', 'Shift', 'Meta'];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    modifier = _ref1[_j];
    KeyboardEventModifiers.add(modifier);
  }

  WindowsAndLinuxKeyIdentifierTranslations = {
    'U+00A0': 'Shift',
    'U+00A1': 'Shift',
    'U+00A2': 'Control',
    'U+00A3': 'Control',
    'U+00A4': 'Alt',
    'U+00A5': 'Alt',
    'Win': 'Meta'
  };

  WindowsAndLinuxCharCodeTranslations = {
    48: {
      shifted: 41,
      unshifted: 48
    },
    49: {
      shifted: 33,
      unshifted: 49
    },
    50: {
      shifted: 64,
      unshifted: 50
    },
    51: {
      shifted: 35,
      unshifted: 51
    },
    52: {
      shifted: 36,
      unshifted: 52
    },
    53: {
      shifted: 37,
      unshifted: 53
    },
    54: {
      shifted: 94,
      unshifted: 54
    },
    55: {
      shifted: 38,
      unshifted: 55
    },
    56: {
      shifted: 42,
      unshifted: 56
    },
    57: {
      shifted: 40,
      unshifted: 57
    },
    186: {
      shifted: 58,
      unshifted: 59
    },
    187: {
      shifted: 43,
      unshifted: 61
    },
    188: {
      shifted: 60,
      unshifted: 44
    },
    189: {
      shifted: 95,
      unshifted: 45
    },
    190: {
      shifted: 62,
      unshifted: 46
    },
    191: {
      shifted: 63,
      unshifted: 47
    },
    192: {
      shifted: 126,
      unshifted: 96
    },
    219: {
      shifted: 123,
      unshifted: 91
    },
    220: {
      shifted: 124,
      unshifted: 92
    },
    221: {
      shifted: 125,
      unshifted: 93
    },
    222: {
      shifted: 34,
      unshifted: 39
    }
  };

  NumPadToASCII = {
    79: 47,
    74: 42,
    77: 45,
    75: 43,
    78: 46,
    96: 48,
    65: 49,
    66: 50,
    67: 51,
    68: 52,
    69: 53,
    70: 54,
    71: 55,
    72: 56,
    73: 57
  };

  exports.normalizeKeystrokes = function(keystrokes) {
    var keystroke, normalizedKeystroke, normalizedKeystrokes, _k, _len2, _ref2;
    normalizedKeystrokes = [];
    _ref2 = keystrokes.split(WhitespaceRegex);
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      keystroke = _ref2[_k];
      if (normalizedKeystroke = normalizeKeystroke(keystroke)) {
        normalizedKeystrokes.push(normalizedKeystroke);
      } else {
        return false;
      }
    }
    return normalizedKeystrokes.join(' ');
  };

  exports.keystrokeForKeyboardEvent = function(event, dvorakQwertyWorkaroundEnabled) {
    var key, keystroke;
    key = keyForKeyboardEvent(event, dvorakQwertyWorkaroundEnabled);
    keystroke = '';
    if (event.ctrlKey || key === 'Control') {
      keystroke += 'ctrl';
    }
    if (event.altKey || key === 'Alt') {
      if (keystroke) {
        keystroke += '-';
      }
      keystroke += 'alt';
    }
    if (event.shiftKey || key === 'Shift') {
      if (!/^[^A-Za-z]$/.test(key)) {
        if (keystroke) {
          keystroke += '-';
        }
        keystroke += 'shift';
      }
    }
    if (event.metaKey || key === 'Meta') {
      if (keystroke) {
        keystroke += '-';
      }
      keystroke += 'cmd';
    }
    if ((key != null) && !KeyboardEventModifiers.has(key)) {
      if (keystroke) {
        keystroke += '-';
      }
      keystroke += key;
    }
    if (event.type === 'keyup') {
      keystroke = normalizeKeystroke("^" + keystroke);
    }
    return keystroke;
  };

  exports.characterForKeyboardEvent = function(event, dvorakQwertyWorkaroundEnabled) {
    var key;
    if (!(event.ctrlKey || event.altKey || event.metaKey)) {
      if (key = keyForKeyboardEvent(event, dvorakQwertyWorkaroundEnabled)) {
        if (key.length === 1) {
          return key;
        }
      }
    }
  };

  exports.calculateSpecificity = calculateSpecificity;

  exports.isAtomModifier = function(keystroke) {
    return AtomModifiers.has(keystroke) || AtomModifierRegex.test(keystroke);
  };

  exports.keydownEvent = function(key, options) {
    return keyboardEvent(key, 'keydown', options);
  };

  exports.keyupEvent = function(key, options) {
    return keyboardEvent(key, 'keyup', options);
  };

  keyboardEvent = function(key, eventType, _arg) {
    var alt, bubbles, cancelable, cmd, ctrl, event, keyCode, keyIdentifier, location, shift, target, view, _ref2;
    _ref2 = _arg != null ? _arg : {}, ctrl = _ref2.ctrl, shift = _ref2.shift, alt = _ref2.alt, cmd = _ref2.cmd, keyCode = _ref2.keyCode, target = _ref2.target, location = _ref2.location;
    event = document.createEvent('KeyboardEvent');
    bubbles = true;
    cancelable = true;
    view = null;
    if (LowerCaseLetterRegex.test(key)) {
      key = key.toUpperCase();
    }
    if (key.length === 1) {
      keyIdentifier = "U+" + (key.charCodeAt(0).toString(16));
    } else {
      switch (key) {
        case 'ctrl':
          keyIdentifier = 'Control';
          if (eventType !== 'keyup') {
            ctrl = true;
          }
          break;
        case 'alt':
          keyIdentifier = 'Alt';
          if (eventType !== 'keyup') {
            alt = true;
          }
          break;
        case 'shift':
          keyIdentifier = 'Shift';
          if (eventType !== 'keyup') {
            shift = true;
          }
          break;
        case 'cmd':
          keyIdentifier = 'Meta';
          if (eventType !== 'keyup') {
            cmd = true;
          }
          break;
        default:
          keyIdentifier = key[0].toUpperCase() + key.slice(1);
      }
    }
    if (location == null) {
      location = KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
    }
    event.initKeyboardEvent(eventType, bubbles, cancelable, view, keyIdentifier, location, ctrl, alt, shift, cmd);
    if (target != null) {
      Object.defineProperty(event, 'target', {
        get: function() {
          return target;
        }
      });
      Object.defineProperty(event, 'path', {
        get: function() {
          return [target];
        }
      });
    }
    Object.defineProperty(event, 'keyCode', {
      get: function() {
        return keyCode;
      }
    });
    Object.defineProperty(event, 'which', {
      get: function() {
        return keyCode;
      }
    });
    return event;
  };

  exports.keystrokesMatch = function(bindingKeystrokes, userKeystrokes) {
    var bindingKeystroke, bindingKeystrokeIndex, bindingRemainderContainsOnlyKeyups, doesMatch, isPartialMatch, matchesNextUserKeystroke, userKeystrokeIndex, userKeystrokesHasKeydownEvent, _k, _len2;
    userKeystrokeIndex = -1;
    userKeystrokesHasKeydownEvent = false;
    matchesNextUserKeystroke = function(bindingKeystroke) {
      var isKeydownEvent, userKeystroke;
      while (userKeystrokeIndex < userKeystrokes.length - 1) {
        userKeystrokeIndex += 1;
        userKeystroke = userKeystrokes[userKeystrokeIndex];
        isKeydownEvent = !userKeystroke.startsWith('^');
        if (isKeydownEvent) {
          userKeystrokesHasKeydownEvent = true;
        }
        if (bindingKeystroke === userKeystroke) {
          return true;
        } else if (isKeydownEvent) {
          return false;
        }
      }
      return null;
    };
    isPartialMatch = false;
    bindingRemainderContainsOnlyKeyups = true;
    bindingKeystrokeIndex = 0;
    for (_k = 0, _len2 = bindingKeystrokes.length; _k < _len2; _k++) {
      bindingKeystroke = bindingKeystrokes[_k];
      if (!isPartialMatch) {
        doesMatch = matchesNextUserKeystroke(bindingKeystroke);
        if (doesMatch === false) {
          return false;
        } else if (doesMatch === null) {
          if (userKeystrokesHasKeydownEvent) {
            isPartialMatch = true;
          } else {
            return false;
          }
        }
      }
      if (isPartialMatch) {
        if (!bindingKeystroke.startsWith('^')) {
          bindingRemainderContainsOnlyKeyups = false;
        }
      }
    }
    if (userKeystrokeIndex < userKeystrokes.length - 1) {
      return false;
    }
    if (isPartialMatch && bindingRemainderContainsOnlyKeyups) {
      return KeydownExactMatch;
    } else if (isPartialMatch) {
      return PartialMatch;
    } else {
      return ExactMatch;
    }
  };

  normalizeKeystroke = function(keystroke) {
    var i, isKeyup, key, keys, modifiers, primaryKey, _k, _len2;
    if (isKeyup = keystroke.startsWith('^')) {
      keystroke = keystroke.slice(1);
    }
    keys = parseKeystroke(keystroke);
    if (!keys) {
      return false;
    }
    primaryKey = null;
    modifiers = new Set;
    for (i = _k = 0, _len2 = keys.length; _k < _len2; i = ++_k) {
      key = keys[i];
      if (AtomModifiers.has(key)) {
        modifiers.add(key);
      } else {
        if (i === keys.length - 1) {
          primaryKey = key;
        } else {
          return false;
        }
      }
    }
    if (isKeyup) {
      if (primaryKey != null) {
        primaryKey = primaryKey.toLowerCase();
      }
    } else {
      if (UpperCaseLetterRegex.test(primaryKey)) {
        modifiers.add('shift');
      }
      if (modifiers.has('shift') && LowerCaseLetterRegex.test(primaryKey)) {
        primaryKey = primaryKey.toUpperCase();
      }
    }
    keystroke = [];
    if (!isKeyup || (isKeyup && (primaryKey == null))) {
      if (modifiers.has('ctrl')) {
        keystroke.push('ctrl');
      }
      if (modifiers.has('alt')) {
        keystroke.push('alt');
      }
      if (modifiers.has('shift')) {
        keystroke.push('shift');
      }
      if (modifiers.has('cmd')) {
        keystroke.push('cmd');
      }
    }
    if (primaryKey != null) {
      keystroke.push(primaryKey);
    }
    keystroke = keystroke.join('-');
    if (isKeyup) {
      keystroke = "^" + keystroke;
    }
    return keystroke;
  };

  parseKeystroke = function(keystroke) {
    var character, index, keyStart, keys, _k, _len2;
    keys = [];
    keyStart = 0;
    for (index = _k = 0, _len2 = keystroke.length; _k < _len2; index = ++_k) {
      character = keystroke[index];
      if (character === '-') {
        if (index > keyStart) {
          keys.push(keystroke.substring(keyStart, index));
          keyStart = index + 1;
          if (keyStart === keystroke.length) {
            return false;
          }
        }
      }
    }
    if (keyStart < keystroke.length) {
      keys.push(keystroke.substring(keyStart));
    }
    return keys;
  };

  keyForKeyboardEvent = function(event, dvorakQwertyWorkaroundEnabled) {
    var charCode, key, keyIdentifier, _ref2, _ref3;
    keyIdentifier = event.keyIdentifier;
    if ((_ref2 = process.platform) === 'linux' || _ref2 === 'win32') {
      keyIdentifier = translateKeyIdentifierForWindowsAndLinuxChromiumBug(keyIdentifier);
    }
    if (KeyboardEventModifiers.has(keyIdentifier)) {
      return keyIdentifier;
    }
    charCode = charCodeFromKeyIdentifier(keyIdentifier);
    if (dvorakQwertyWorkaroundEnabled && typeof charCode === 'number') {
      if (event.keyCode === 46) {
        charCode = 127;
      } else {
        charCode = event.keyCode;
      }
    }
    if (charCode != null) {
      if ((_ref3 = process.platform) === 'linux' || _ref3 === 'win32') {
        charCode = translateCharCodeForWindowsAndLinuxChromiumBug(charCode, event.shiftKey);
      }
      if (event.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
        charCode = numpadToASCII(charCode);
      }
      if (!isASCII(charCode) && isASCII(event.keyCode)) {
        charCode = event.which;
      }
      key = keyFromCharCode(charCode);
    } else {
      key = keyIdentifier.toLowerCase();
    }
    if (event.shiftKey) {
      if (LowerCaseLetterRegex.test(key)) {
        key = key.toUpperCase();
      }
    } else {
      if (UpperCaseLetterRegex.test(key)) {
        key = key.toLowerCase();
      }
    }
    return key;
  };

  charCodeFromKeyIdentifier = function(keyIdentifier) {
    if (keyIdentifier.indexOf('U+') === 0) {
      return parseInt(keyIdentifier.slice(2), 16);
    }
  };

  translateKeyIdentifierForWindowsAndLinuxChromiumBug = function(keyIdentifier) {
    var _ref2;
    return (_ref2 = WindowsAndLinuxKeyIdentifierTranslations[keyIdentifier]) != null ? _ref2 : keyIdentifier;
  };

  translateCharCodeForWindowsAndLinuxChromiumBug = function(charCode, shift) {
    var translation;
    if (translation = WindowsAndLinuxCharCodeTranslations[charCode]) {
      if (shift) {
        return translation.shifted;
      } else {
        return translation.unshifted;
      }
    } else {
      return charCode;
    }
  };

  keyFromCharCode = function(charCode) {
    switch (charCode) {
      case 8:
        return 'backspace';
      case 9:
        return 'tab';
      case 13:
        return 'enter';
      case 27:
        return 'escape';
      case 32:
        return 'space';
      case 127:
        return 'delete';
      default:
        return String.fromCharCode(charCode);
    }
  };

  isASCII = function(charCode) {
    return (0 <= charCode && charCode <= 127);
  };

  numpadToASCII = function(charCode) {
    var _ref2;
    return (_ref2 = NumPadToASCII[charCode]) != null ? _ref2 : charCode;
  };

}).call(this);
