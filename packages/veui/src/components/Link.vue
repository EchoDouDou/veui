<template>
<component
  :is="fallback"
  v-if="!to"
  :class="klass"
  :ui="realUi"
  :aria-disabled="disabled"
  :tabindex="disabled ? -1 : null"
  @click="handleRedirect"
>
  <slot/>
</component>
<router-link
  v-else-if="useRouter"
  :class="klass"
  :to="to"
  :rel="realRel"
  :target="target"
  :ui="realUi"
  :aria-disabled="disabled"
  :tabindex="disabled ? -1 : null"
  :replace="replace"
  :event="disabled ? null : 'click'"
  @click.native="handleNativeClick"
>
  <slot/>
</router-link>
<a
  v-else
  :class="klass"
  :href="to"
  :rel="realRel"
  :target="target"
  :ui="realUi"
  :aria-disabled="disabled"
  :tabindex="disabled ? -1 : null"
  @click="handleRedirect"
>
  <slot/>
</a>
</template>

<script>
import { uniq } from 'lodash'
import prefix from '../mixins/prefix'
import ui from '../mixins/ui'

export default {
  name: 'veui-link',
  mixins: [prefix, ui],
  props: {
    to: {
      type: [String, Object],
      default: ''
    },
    replace: Boolean,
    native: Boolean,
    fallback: {
      type: String,
      default: 'span'
    },
    disabled: Boolean,
    rel: String,
    target: String
  },
  computed: {
    klass () {
      return {
        [this.$c('link')]: true,
        [this.$c('disabled')]: this.disabled
      }
    },
    realRel () {
      if (this.target && this.target.toLowerCase() === '_blank') {
        return uniq(
          [...(this.rel || '').split(/\s+/), 'noopener'].filter(t => t)
        ).join(' ')
      }
      return this.rel
    },
    useRouter () {
      return this.$router && !this.native
    }
  },
  methods: {
    handleRedirect (event) {
      if (this.disabled) {
        event.preventDefault()
        return
      }
      if (this.to) {
        this.$emit('click', event)

        if (this.replace && !event.defaultPrevented) {
          event.preventDefault()
          location.replace(this.to)
        }
      } else {
        event.preventDefault()
        this.$emit('click', event)
      }
    },
    handleNativeClick (event) {
      if (this.disabled) {
        return
      }
      this.$emit('click', event)
    }
  }
}
</script>
