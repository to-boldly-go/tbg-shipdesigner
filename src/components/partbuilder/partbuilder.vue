<template>
	<div class="root">
		<div class="header">
			<PartsListHeader></PartsListHeader>
		</div>
		<div class="editor">
			<PartsListEditor></PartsListEditor>
		</div>
		<div class="footer">
			<PartsListFooter></PartsListFooter>
		</div>
	</div>
</template>


<script>

import PartsListHeader from '@/components/partbuilder/parts-list-header.vue';
import PartsListFooter from '@/components/partbuilder/parts-list-footer.vue';
import PartsListEditor from '@/components/partbuilder/parts-list-editor.vue';

const PARTS_KEY = 'working_parts_list';

export default {
	name: 'app',
	components: {
		PartsListHeader,
		PartsListFooter,
		PartsListEditor,
	},
	data() {
		return {
		};
	},
	mounted() {
		this.load_parts_from_storage();
	},
	updated() {
		this.save_parts_to_storage();
	},
	methods: {
		load_parts_from_storage() {
			const saved_parts = localStorage.getItem(PARTS_KEY);
			if (saved_parts) {
				this.data = JSON.parse(saved_parts);
			} else if (this.data) {
				localStorage.setItem(PARTS_KEY, JSON.stringify(this.data));
			}
		},
		save_parts_to_storage() {
			if (this.data) {
				localStorage.setItem(PARTS_KEY, JSON.stringify(this.data));
			}
		},
	},
};

</script>

<style scoped>
.root {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;

	font-family: arial, sans-serif;
	font-size: 13px;
	font-stretch: 100%;
	font-style: 100%;
	font-variant-caps: normal;
	font-variant-ligatures: normal;
	font-variant-numeric: normal;
	font-weight: 400;
}

.header {
	flex: 0 0 auto;
	border-bottom: 2px solid;
}

.editor {
	flex: 1 1 auto;
	position: relative;/* need this to position inner content */
	overflow-y: auto;
}

.footer {
	flex: 0 0 auto;
	border-top: 2px solid;
}

</style>

<style>

button, input, select, textarea {
	font-family : inherit;
	font-size   : 100%;
}

</style>
