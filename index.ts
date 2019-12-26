import { customElement, LitElement, html } from 'lit-element'
import storage from 'std:kv-storage'
import './src/mood-tracker.js'

const today = new Date
if (today.getHours() <= 5) // before 5 A.M.
  today.setDate(today.getDate() - 1)
today.setHours(0)
today.setMinutes(0)
today.setSeconds(0)

interface Diary {
  mood: string
}

@customElement('goal-tracker')
export default class extends LitElement {
  private diary?: Diary

  private finishedSaving = false

  protected firstUpdated = async () => {
    this.diary = await storage.get(today.toDateString()) as unknown as Diary
    this.performUpdate()
  }

  private readonly chooseMood = (event: CustomEvent<string>) => {
    this.diary = {
      ...this.diary,
      mood: event.detail,
    }
    this.save()
  }

  private readonly save = async () => {
    await storage.set(today.toDateString(), this.diary)
    this.finishedSaving = true
    await this.performUpdate()
    this.finishedSaving = false
  }

  readonly render = () => html`
    <mood-tracker
      .today=${today}
      @choose=${this.chooseMood}
    ></mood-tracker>
    <mwc-snackbar
      labelText="Saved."
      ?isopen=${this.finishedSaving}
    ></mwc-snackbar>
  `
}
