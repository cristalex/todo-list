<template>
  <transition name="fade">
    <div class="popup" v-show="active">
      <div class="popup__wrap">
        <div class="popup__content">
          <button
            type="button"
            class="btn btn--icon popup__close"
            @click="closePopup()"
          >
            <close-icon title="Close popup" />
          </button>
          <div class="popup__body">
            <h2 class="popup__title">
              {{ item.title ? item.title : "Confirmation" }}
            </h2>
            <div class="popup__text">
              {{ item.text ? item.text : "Confirm item deletion" }}
            </div>
          </div>
          <div class="popup__btns">
            <button type="button" class="btn" @click="$emit('confirm')">
              {{ item.confirmBtnText ? item.confirmBtnText : "Confirm" }}
            </button>
            <button type="button" class="btn btn--cancel" @click="closePopup()">
              {{ item.CancelmBtnText ? item.CancelmBtnText : "Cancel" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations } from "vuex";
import CloseIcon from "vue-material-design-icons/Close";
export default {
  name: "Popup",
  props: {
    item: {
      type: Object
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CloseIcon
  },
  methods: {
    ...mapMutations(["SET_POPUP"]),
    closePopup() {
      console.log("test");
      this.SET_POPUP(null);
    }
  }
};
</script>
