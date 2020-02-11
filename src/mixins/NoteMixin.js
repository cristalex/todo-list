import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["GET_NOTES_LIST", "GET_POPUP_STATE"])
  },
  methods: {
    ...mapMutations(["SET_POPUP"]),
    ...mapActions(["DELETE_NOTE"]),
    deleteNote() {
      this.DELETE_NOTE();
      if (this.$route.params.id) {
        this.$router.push({ name: "home" });
      }
    },
    confirmDeletion(deleteId) {
      // console.log("Data id: ", deleteId);
      this.SET_POPUP({
        id: deleteId
      });
    },
    confirmCancelation() {
      this.cancelPopupState = true;
      this.SET_POPUP({
        id: ""
      });
    }
  }
};
