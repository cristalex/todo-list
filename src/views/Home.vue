<template>
  <section class="home">
    <h1 class="home__title">Home</h1>
    <div class="home__btns">
      <router-link :to="{ name: 'note' }" class="btn btn--center">
        <add-note-icon title="Add note" />
        <span>Add note</span>
      </router-link>
    </div>
    <div class="note">
      <h2 class="note__title">Notes list</h2>
      <div class="note__list" v-if="GET_NOTES_LIST.length">
        <note-item
          v-for="(noteItem, noteIndex) in GET_NOTES_LIST"
          :key="noteIndex"
          :item="noteItem"
          :id="noteIndex"
          @delNote="confirmDeletion(noteIndex)"
        />
      </div>
      <div class="no-items-text" v-else>No notes added</div>
    </div>
    <popup
      @confirm="deleteNote"
      :active="GET_POPUP_STATE"
      :item="settings.POPUP_DELETE_NOTE"
    />
  </section>
</template>

<script>
import SettingsMixin from "../mixins/SettingsMixin";
import NoteMixin from "../mixins/NoteMixin";
import { mapMutations } from "vuex";
import AddNoteIcon from "vue-material-design-icons/ClipboardPlus";
import NoteItem from "../components/NoteItem";
import Popup from "../components/Popup";

export default {
  name: "Home",
  components: {
    AddNoteIcon,
    NoteItem,
    Popup
  },
  mixins: [SettingsMixin, NoteMixin],
  mounted() {
    this.UNSET_EDIT_MODE();
  },
  methods: {
    ...mapMutations(["UNSET_EDIT_MODE"])
  }
};
</script>
