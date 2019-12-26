import { customElement, LitElement, html, property } from 'lit-element'
import '@material/mwc-fab'

@customElement('mood-tracker')
export default class extends LitElement {
  @property({type: Date})
  private now!: Date

  private readonly updateFeelings = (detail: string) => () =>
    this.dispatchEvent(new CustomEvent('choose', {detail}))

  readonly render = () => html`
    <h1
      title=${this.now.toDateString()}
      class="theme-summary-typography mdc-typography--headline1"
    >How's your mood Today?</h1>
    <mwc-fab
      icon=sentiment_very_dissatisfied
      label="Very Dissatisfied"
      disabled
      @click=${this.updateFeelings('☹️')}
    ></mwc-fab>
    <mwc-fab
      icon=sentiment_dissatisfied
      label="Dissatisfied"
      @click=${this.updateFeelings('🙁')}
    ></mwc-fab>
    <mwc-fab
      icon=sentiment_satisfied
      label="Satisfied"
      @click=${this.updateFeelings('🙂')}
    ></mwc-fab>
    <mwc-fab
      icon=sentiment_very_satisfied
      label="Very Satisfied"
      @click=${this.updateFeelings('😁')}
    ></mwc-fab>
  `
}
