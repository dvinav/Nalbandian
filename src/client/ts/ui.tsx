import { DOM } from './dom'
import { Modal } from 'bootstrap'
import '../sass/styles.sass'

export namespace UI 
{

	export namespace Tabs {
		const Default = 3

		export let Active: number = Default

		export const Switch = (tab: number) => {
			/* Switch: (tab, callback = () => { }) => {
				Tab.Active = tab
				$('.activeTabBtn').removeClass('activeTabBtn')
				$('.activeTabContainer').removeClass('activeTabContainer')
				$(`.tabButton[data-tab-button=${tab}]`).addClass('activeTabBtn')
				setTimeout(() => $(`.tabContainer[data-tab=${tab}]`).addClass('activeTabContainer', callback()), 200)
				$('.tabIndicator').css({
					marginLeft: `${(5 + 23.333 * (tab - 1) + [0, 2, 4][tab - 1] * 5)}%`
				})
			} */

			if (document.getElementsByClassName('activeTabBtn')[0]) {
				document.getElementsByClassName('activeTabBtn')[0].classList.remove('ActiveTabBtn')
			}

			
			document.getElementById('tabIndicator')!.style.marginLeft = `${(5 + 23.333 * (tab - 1) + [0, 2, 4][tab - 1] * 5)}%`
			
			Active = tab
		}
	}

	export const Init = () => {
		DOM.Init()
	}

}