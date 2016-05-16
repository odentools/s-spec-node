module.exports = {

	/**
	 * Conver the string to upper case
	 * @return {String} Converted string
	 */
	toUpperCase: function (str) {

		var self = this;

		if ('i' !== 'I'.toLowerCase()) {
			// Thanks for http://qiita.com/niusounds/items/fff91f3f236c31ca910f
			return str.replace(/[a-z]/g, function(ch) {
				return String.fromCharCode(ch.charCodeAt(0) & ~32);
			});
		}

		return str.toUpperCase();

	},


	/**
	 * Get a whether the value is matched with specified type
	 * @param  {String}  type  Variable type
	 * @param  {Object}  obj   Target object
	 * @return {Boolean}       Whether the value is matched to the type
	 */
	isType: function (type, obj) {

		var clas = Object.prototype.toString.call(obj).slice(8, -1);
		return obj !== undefined && obj !== null && clas === type;

	}

};
