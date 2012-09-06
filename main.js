$(function () {

	new function ($) {
		$.fn.setCursorPosition = function (pos) {
			if ($(this).get(0).setSelectionRange) {
				$(this).get(0).setSelectionRange(pos, pos);
			} else if ($(this).get(0).createTextRange) {
				var range = $(this).get(0).createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		}
	} (jQuery);

	$.support.placeholder = (function () {
		var input = document.createElement('input');
		return 'placeholder' in input;
	})();

	if (!$.support.placeholder) {
		$("input[type=text], input[type=email]").each(function () {
			var $this = $(this);
			var placeholder = $this.attr("placeholder");

			if (placeholder && placeholder.length > 0) {
				$this.val(placeholder).addClass("placeholderText");

				$this.focus(function () {
					if ($this.val() == placeholder) {
						if ($this.get(0).setSelectionRange) {
							$this.get(0).setSelectionRange(0, 0);
						} else if ($this.get(0).createTextRange) {
							var range = $this.get(0).createTextRange();
							range.collapse(true);
							range.moveEnd('character', 0);
							range.moveStart('character', 0);
							range.select();
						}
					}
				});
				$this.blur(function () {
					if ($this.val() == "") {
						$this.val(placeholder).addClass("placeholderText");
					}
				});
				$this.keypress(function (e) {
					if ($this.val() == placeholder) {
						$this.val("").removeClass("placeholderText");
					}
				});
				$this.keyup(function () {
					if ($this.val() == "") {
						$this.val(placeholder).addClass("placeholderText");
					}
				});
				$this.bind('paste', function (e) {
					if ($this.val() == placeholder) {
						$this.val("").removeClass("placeholderText");
					}
				});
			}
		});
	}
});