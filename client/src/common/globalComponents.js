import fgInput from '../components/UIComponents/Inputs/formGroupInput.vue'
import fcgInput from '../components/UIComponents/Inputs/formChannelGroupInput.vue'
import fgTextarea from '../components/UIComponents/Inputs/formGroupTextarea.vue'
import DropDown from '../components/UIComponents/Common/Dropdown.vue'
import SideBarDropdown from '../components/UIComponents/Common/SideBarDropdown.vue'
import ModalDropdown from '../components/UIComponents/Common/ModalDropdown.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('fcg-input', fcgInput)
    Vue.component('fg-textarea', fgTextarea)
    Vue.component('drop-down', DropDown)
    Vue.component('side-bar-drop-down', SideBarDropdown)
    Vue.component('modal-drop-down', ModalDropdown)
  }
}

export default GlobalComponents
