import { customElement, LitElement, html, property } from 'lit-element'
import '@material/mwc-textarea'

@customElement('diary-tracker')
export default class extends LitElement {
  private handle?: NodeJS.Timeout

  @property({ type: String })
  private placeholder?: string
  
  @property({ type: String })
  private mood!: string

  /** Emits event after no inputs have been made for `delayMs`. */
  private delayedInput = (delayMs: number) => ({ target }: InputEvent & { target: EventTarget & { value: string } }) => {
    if (this.handle)
      clearTimeout(this.handle)

    this.handle = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('new-text', { detail: target?.value }))
      delete this.handle
    }, delayMs)
  }

  readonly render = () => html`
    <mwc-textarea
      outlined
      fullWidth
      placeholder="Reasons for feeling ${this.mood} today"
      @input=${this.delayedInput(1000)}
      value=${this.placeholder || ''}
    ></mwc-textarea>
  `
}
