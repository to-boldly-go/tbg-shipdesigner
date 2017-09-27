<template>
  <td class="cell"
	  @click="edit_cell"
	  @focus="edit_cell"
	  tabindex="0"
	  v-bind:style="computed_style">

	<span
	  class="display-span"
	  v-show="!is_editing">{{display_value}}</span>
	
	<input
	  v-if="is_editing"
	  class="edit-input"
	  ref="input"
	  type="text"
	  @blur="commit_edit"
	  @keydown="on_keydown"
	  v-focus
	  v-model="temp_value"></input>
  </td>
</template>

<script>

export default {
	name: 'PartsListCell',
	components: {
	},
	directives: {
		focus: {
			inserted (el) {
				el.focus();
			},
		},
	},
	props: {
		part: {
			type: Object,
		},
		field: {
			type: Object,
		},
	},
	data () {
		return {
			is_editing: false,
			temp_value: null,
		};
	},
	computed: {
		computed_style () {
			return {
				'width': this.field.width.toString() + 'px',
				'text-align': this.field.align,
			};
		},
		display_value () {
			return this.value;
		},
		value: {
			get () {
				switch (this.field.edit_type) {
				case 'number':
					return this.value_number;
					break;
				case 'string':
					return this.value_string;
					break;
				};
			},
			set (value) {
				switch (this.field.edit_type) {
				case 'number':
					this.value_number = value;
					break;
				case 'string':
					this.value_string = value;
					break;
				};
				this.partupdate();
			},
		},
		value_number: {
			get () {
				return this.part[this.field.name];
			},
			set (value) {
				this.part[this.field.name] = parseFloat(value);
			},
		},
		value_string: {
			get () {
				return this.part[this.field.name];
			},
			set (value) {
				this.part[this.field.name] = value;
			},
		},
	},
	methods: {
		partupdate () {
			this.$emit('partupdate');
		},
		on_keydown(ev) {
			switch (ev.key){
			case 'Enter':
				// leave focus and let the app save changes
				this.commit_edit();
				break;
			case 'Escape':
				this.abort_edit();
				break;
			};
		},
		abort_edit () {
			this.temp_value = this.value;
			this.is_editing = false;
		},
		edit_cell (ev) {
			this.is_editing = true;
			this.temp_value = this.value;
		},
		commit_edit (ev) {
			this.is_editing = false;
			this.value = this.temp_value;
		},
	},
};
</script>

<style scoped>

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

.cell {
	border: 1px solid #eee;
	cursor: cell;
}

.display-span {
	width: 100%;
}

.edit-input {
	padding: 0px;
	border-width: 0;
	width: 100%;
    box-sizing: border-box;
}


</style>

<style>

</style>
