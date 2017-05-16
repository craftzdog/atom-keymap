'use strict';
'use babel';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function PartialKeyupMatcher() {
    _classCallCheck(this, PartialKeyupMatcher);

    this._pendingMatches = new Set();
  }

  _createClass(PartialKeyupMatcher, [{
    key: 'addPendingMatch',
    value: function addPendingMatch(keyBinding) {
      this._pendingMatches.add(keyBinding);
      keyBinding['nextKeyUpIndex'] = 0;
    }

    // Returns matching bindingss, if any.
    // Updates state for next match.

  }, {
    key: 'getMatches',
    value: function getMatches(userKeyupKeystroke) {
      userKeyupKeystroke = this._normalizeKeystroke(userKeyupKeystroke);
      var matches = new Set();

      // Loop over each pending keyup match.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._pendingMatches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var keyBinding = _step.value;

          var bindingKeystrokeToMatch = this._normalizeKeystroke(keyBinding.getKeyups()[keyBinding['nextKeyUpIndex']]);
          if (userKeyupKeystroke === bindingKeystrokeToMatch) {
            this._updateStateForMatch(matches, keyBinding);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return [].concat(_toConsumableArray(matches));
    }

    /** Private Section **/

  }, {
    key: '_normalizeKeystroke',
    value: function _normalizeKeystroke(keystroke) {
      if (keystroke[0] === '^') return keystroke.substring(1);
      return keystroke;
    }
  }, {
    key: '_updateStateForMatch',
    value: function _updateStateForMatch(matches, keyBinding) {
      if (keyBinding['nextKeyUpIndex'] === keyBinding.getKeyups().length - 1) {
        // Full match. Remove and return it.
        this._pendingMatches.delete(keyBinding);
        matches.add(keyBinding);
      } else {
        // Partial match. Increment what we're looking for next.
        keyBinding['nextKeyUpIndex']++;
      }
    }
  }]);

  return PartialKeyupMatcher;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJ0aWFsLWtleXVwLW1hdGNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztBQUVBLE9BQU8sT0FBUDtBQUdFLGlDQUFlO0FBQUE7O0FBQ2IsU0FBSyxlQUFMLEdBQXVCLElBQUksR0FBSixFQUF2QjtBQUNEOztBQUxIO0FBQUE7QUFBQSxvQ0FPbUIsVUFQbkIsRUFPK0I7QUFDM0IsV0FBSyxlQUFMLENBQXFCLEdBQXJCLENBQXlCLFVBQXpCO0FBQ0EsaUJBQVcsZ0JBQVgsSUFBK0IsQ0FBL0I7QUFDRDs7QUFFRDtBQUNBOztBQWJGO0FBQUE7QUFBQSwrQkFjYyxrQkFkZCxFQWNrQztBQUM5QiwyQkFBcUIsS0FBSyxtQkFBTCxDQUF5QixrQkFBekIsQ0FBckI7QUFDQSxVQUFJLFVBQVUsSUFBSSxHQUFKLEVBQWQ7O0FBRUE7QUFKOEI7QUFBQTtBQUFBOztBQUFBO0FBSzlCLDZCQUF5QixLQUFLLGVBQTlCLDhIQUErQztBQUFBLGNBQXBDLFVBQW9DOztBQUM3QyxjQUFNLDBCQUEwQixLQUFLLG1CQUFMLENBQzlCLFdBQVcsU0FBWCxHQUF1QixXQUFXLGdCQUFYLENBQXZCLENBRDhCLENBQWhDO0FBR0EsY0FBSSx1QkFBdUIsdUJBQTNCLEVBQW9EO0FBQ2xELGlCQUFLLG9CQUFMLENBQTBCLE9BQTFCLEVBQW1DLFVBQW5DO0FBQ0Q7QUFDRjtBQVo2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWE5QiwwQ0FBVyxPQUFYO0FBQ0Q7O0FBRUQ7O0FBOUJGO0FBQUE7QUFBQSx3Q0FnQ3VCLFNBaEN2QixFQWdDa0M7QUFDOUIsVUFBSSxVQUFVLENBQVYsTUFBaUIsR0FBckIsRUFBMEIsT0FBTyxVQUFVLFNBQVYsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUMxQixhQUFPLFNBQVA7QUFDRDtBQW5DSDtBQUFBO0FBQUEseUNBcUN3QixPQXJDeEIsRUFxQ2lDLFVBckNqQyxFQXFDNkM7QUFDekMsVUFBSSxXQUFXLGdCQUFYLE1BQWlDLFdBQVcsU0FBWCxHQUF1QixNQUF2QixHQUFnQyxDQUFyRSxFQUF3RTtBQUN0RTtBQUNBLGFBQUssZUFBTCxDQUFxQixNQUFyQixDQUE0QixVQUE1QjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0QsT0FKRCxNQUlPO0FBQ0w7QUFDQSxtQkFBVyxnQkFBWDtBQUNEO0FBQ0Y7QUE5Q0g7O0FBQUE7QUFBQSIsImZpbGUiOiJwYXJ0aWFsLWtleXVwLW1hdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQYXJ0aWFsS2V5dXBNYXRjaGVyIHtcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fcGVuZGluZ01hdGNoZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGFkZFBlbmRpbmdNYXRjaCAoa2V5QmluZGluZykge1xuICAgIHRoaXMuX3BlbmRpbmdNYXRjaGVzLmFkZChrZXlCaW5kaW5nKVxuICAgIGtleUJpbmRpbmdbJ25leHRLZXlVcEluZGV4J10gPSAwXG4gIH1cblxuICAvLyBSZXR1cm5zIG1hdGNoaW5nIGJpbmRpbmdzcywgaWYgYW55LlxuICAvLyBVcGRhdGVzIHN0YXRlIGZvciBuZXh0IG1hdGNoLlxuICBnZXRNYXRjaGVzICh1c2VyS2V5dXBLZXlzdHJva2UpIHtcbiAgICB1c2VyS2V5dXBLZXlzdHJva2UgPSB0aGlzLl9ub3JtYWxpemVLZXlzdHJva2UodXNlcktleXVwS2V5c3Ryb2tlKVxuICAgIGxldCBtYXRjaGVzID0gbmV3IFNldCgpXG5cbiAgICAvLyBMb29wIG92ZXIgZWFjaCBwZW5kaW5nIGtleXVwIG1hdGNoLlxuICAgIGZvciAoY29uc3Qga2V5QmluZGluZyBvZiB0aGlzLl9wZW5kaW5nTWF0Y2hlcykge1xuICAgICAgY29uc3QgYmluZGluZ0tleXN0cm9rZVRvTWF0Y2ggPSB0aGlzLl9ub3JtYWxpemVLZXlzdHJva2UoXG4gICAgICAgIGtleUJpbmRpbmcuZ2V0S2V5dXBzKClba2V5QmluZGluZ1snbmV4dEtleVVwSW5kZXgnXV1cbiAgICAgIClcbiAgICAgIGlmICh1c2VyS2V5dXBLZXlzdHJva2UgPT09IGJpbmRpbmdLZXlzdHJva2VUb01hdGNoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlRm9yTWF0Y2gobWF0Y2hlcywga2V5QmluZGluZylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsuLi5tYXRjaGVzXVxuICB9XG5cbiAgLyoqIFByaXZhdGUgU2VjdGlvbiAqKi9cblxuICBfbm9ybWFsaXplS2V5c3Ryb2tlIChrZXlzdHJva2UpIHtcbiAgICBpZiAoa2V5c3Ryb2tlWzBdID09PSAnXicpIHJldHVybiBrZXlzdHJva2Uuc3Vic3RyaW5nKDEpXG4gICAgcmV0dXJuIGtleXN0cm9rZVxuICB9XG5cbiAgX3VwZGF0ZVN0YXRlRm9yTWF0Y2ggKG1hdGNoZXMsIGtleUJpbmRpbmcpIHtcbiAgICBpZiAoa2V5QmluZGluZ1snbmV4dEtleVVwSW5kZXgnXSA9PT0ga2V5QmluZGluZy5nZXRLZXl1cHMoKS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBGdWxsIG1hdGNoLiBSZW1vdmUgYW5kIHJldHVybiBpdC5cbiAgICAgIHRoaXMuX3BlbmRpbmdNYXRjaGVzLmRlbGV0ZShrZXlCaW5kaW5nKVxuICAgICAgbWF0Y2hlcy5hZGQoa2V5QmluZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFydGlhbCBtYXRjaC4gSW5jcmVtZW50IHdoYXQgd2UncmUgbG9va2luZyBmb3IgbmV4dC5cbiAgICAgIGtleUJpbmRpbmdbJ25leHRLZXlVcEluZGV4J10rK1xuICAgIH1cbiAgfVxuXG59XG4iXX0=