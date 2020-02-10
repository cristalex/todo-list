<template>
  <label class="checkbox" :class="{ 'checkbox--mini': minicheck }">
    <input type="checkbox" :checked="value" @change="$emit('success')" />
    <span>
      <checkbox-marked-circle-icon
        :title="minicheck ? 'Todo is done' : 'Change state of todo'"
      />
    </span>
  </label>
</template>
<script>
import CheckboxMarkedCircleIcon from "vue-material-design-icons/CheckboxMarkedCircle";

export default {
  name: "TodoCompleted",
  components: {
    CheckboxMarkedCircleIcon
  },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    minicheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>
