import { toRefs, reactive, computed } from "vue"

const contextPath = import.meta.env.BASE_URL

const layoutConfig = reactive({
  darkTheme: true,
  menuMode: "static",
  theme: "lara-dark-blue",
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
})

export function useLayout() {
  const changeThemeSettings = (theme: string, darkTheme: boolean) => {
    layoutConfig.darkTheme = darkTheme
    layoutConfig.theme = theme
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive)

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  return { contextPath, layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, onMenuToggle, isSidebarActive, isDarkTheme }
}
