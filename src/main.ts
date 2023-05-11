import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import axiosSetUp from "@/plugins/axios"

import "@/assets/styles.scss"

import PrimeVue from "primevue/config"

// components prime vue
import AutoComplete from "primevue/autocomplete"
import Avatar from "primevue/avatar"
import AvatarGroup from "primevue/avatargroup"
import Button from "primevue/button"
import Calendar from "primevue/calendar"
import Card from "primevue/card"
import CascadeSelect from "primevue/cascadeselect"
import Checkbox from "primevue/checkbox"
import Chip from "primevue/chip"
import Chips from "primevue/chips"
import ConfirmDialog from "primevue/confirmdialog"
import ConfirmPopup from "primevue/confirmpopup"
import ConfirmationService from "primevue/confirmationservice"
import ContextMenu from "primevue/contextmenu"
import DataTable from "primevue/datatable"
import Dialog from "primevue/dialog"
import DialogService from "primevue/dialogservice"
import Dropdown from "primevue/dropdown"
import DynamicDialog from "primevue/dynamicdialog"
import Fieldset from "primevue/fieldset"
import Image from "primevue/image"
import Message from "primevue/message"
import InlineMessage from "primevue/inlinemessage"
import Inplace from "primevue/inplace"
import InputSwitch from "primevue/inputswitch"
import InputText from "primevue/inputtext"
import InputMask from "primevue/inputmask"
import InputNumber from "primevue/inputnumber"
import Listbox from "primevue/listbox"
import MegaMenu from "primevue/megamenu"
import Menu from "primevue/menu"
import Menubar from "primevue/menubar"
import MultiSelect from "primevue/multiselect"
import OrderList from "primevue/orderlist"
import Paginator from "primevue/paginator"
import Panel from "primevue/panel"
import PanelMenu from "primevue/panelmenu"
import Password from "primevue/password"
import RadioButton from "primevue/radiobutton"
import Ripple from "primevue/ripple"
import SelectButton from "primevue/selectbutton"
import Slider from "primevue/slider"
import Sidebar from "primevue/sidebar"
import SplitButton from "primevue/splitbutton"
import Steps from "primevue/steps"
import StyleClass from "primevue/styleclass"
import TabMenu from "primevue/tabmenu"
import Textarea from "primevue/textarea"
import Toast from "primevue/toast"
import ToastService from "primevue/toastservice"
import Toolbar from "primevue/toolbar"
import ToggleButton from "primevue/togglebutton"
import Tooltip from "primevue/tooltip"
import TreeSelect from "primevue/treeselect"
import Column from "primevue/column"
import { filter } from "@/plugins/filter"

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

axiosSetUp()
app.use(pinia)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

// eslint-disable-next-line @typescript-eslint/no-var-requires

app.directive("tooltip", Tooltip)
app.directive("ripple", Ripple)
app.directive("styleclass", StyleClass)

app.provide("filters", filter)
app.provide("Toast", Toast)

app.component("AutoComplete", AutoComplete)
app.component("Avatar", Avatar)
app.component("AvatarGroup", AvatarGroup)
app.component("Button", Button)
app.component("Calendar", Calendar)
app.component("Card", Card)
app.component("CascadeSelect", CascadeSelect)
app.component("Checkbox", Checkbox)
app.component("Chip", Chip)
app.component("Chips", Chips)
app.component("ConfirmDialog", ConfirmDialog)
app.component("ConfirmPopup", ConfirmPopup)
app.component("ContextMenu", ContextMenu)
app.component("DataTable", DataTable)
app.component("DataView", DataView)
app.component("Dialog", Dialog)
app.component("Dropdown", Dropdown)
app.component("DynamicDialog", DynamicDialog)
app.component("Fieldset", Fieldset)
app.component("Image", Image)
app.component("Message", Message)
app.component("InlineMessage", InlineMessage)
app.component("Inplace", Inplace)
app.component("InputMask", InputMask)
app.component("InputNumber", InputNumber)
app.component("InputSwitch", InputSwitch)
app.component("InputText", InputText)
app.component("Listbox", Listbox)
app.component("MegaMenu", MegaMenu)
app.component("Menu", Menu)
app.component("Menubar", Menubar)
app.component("MultiSelect", MultiSelect)
app.component("OrderList", OrderList)
app.component("Paginator", Paginator)
app.component("Panel", Panel)
app.component("PanelMenu", PanelMenu)
app.component("Password", Password)
app.component("RadioButton", RadioButton)
app.component("SelectButton", SelectButton)
app.component("Slider", Slider)
app.component("Sidebar", Sidebar)
app.component("SplitButton", SplitButton)
app.component("Steps", Steps)
app.component("TabMenu", TabMenu)
app.component("TextColumnarea", Textarea)
app.component("Toast", Toast)
app.component("Toolbar", Toolbar)
app.component("ToggleButton", ToggleButton)
app.component("TreeSelect", TreeSelect)
app.component("Column", Column)
app.mount("#app")

export const toast = app.config.globalProperties.$toast
