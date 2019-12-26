import { customElement, LitElement, html } from 'lit-element'
import storage from 'std:kv-storage'
import '@material/mwc-snackbar'
import './src/diary-tracker.js'
import './src/mood-tracker.js'

interface Diary {
  mood?: string
  text?: string
}

@customElement('goal-tracker')
export default class extends LitElement {
  private diary?: Diary

  private today = new Date

  private finishedSaving = false

  async connectedCallback() {
    super.connectedCallback()

    if (this.today.getHours() <= 5) // before 5 A.M.
      this.today.setDate(this.today.getDate() - 1)
    this.today.setHours(0)
    this.today.setMinutes(0)
    this.today.setSeconds(0)

    this.diary = await storage.get(this.today.toDateString()) as unknown as Diary
    this.requestUpdate()
  }

  private readonly chooseMood = ({ detail }: CustomEvent<string>) => {
    this.diary = {
      ...this.diary,
      mood: detail,
    }
    this.save()
  }

  private readonly updateDiary = ({ detail }: CustomEvent<string>) => {
    this.diary = {
      ...this.diary,
      text: detail,
    }
    this.save()
  }

  private readonly save = async () => {
    await storage.set(this.today.toDateString(), this.diary)
    this.finishedSaving = true
    await this.requestUpdate()
    this.finishedSaving = false
  }

  readonly render = () => html`
    ${this.diary?.mood
      ? html`
        <diary-tracker
          mood=${this.diary.mood}
          .placeholder=${this.diary.text}
          @new-text=${this.updateDiary}
        ></diary-tracker>`
      : html`
        <mood-tracker
          @choose=${this.chooseMood}
        ></mood-tracker>
    `}
    <!-- <mwc-snackbar
      labelText="Saved."
      ?isOpen=${this.finishedSaving}
    ></mwc-snackbar> -->
  `
}
