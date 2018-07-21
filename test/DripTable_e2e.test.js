import Nightmare from 'nightmare'
import { assert } from "chai";


describe('<E2E test />', () => {
  // true:  Electron を表示
  // false: Electron を非表示
  const nightmare = Nightmare({
      loadTimeout: 45 * 1000,
      waitTimeout: 100 * 1000,
      show: false
    })
  const URL = 'http://localhost:5050'

  after(function() {
    // runs after all tests in this block
  });

  it('checked header checkbox and click Delete icon', function(done) {
    this.timeout('500s')
    const width = 1900
    const height = 1000

    nightmare
      .goto(URL)
      .viewport(width, height)
      .wait(10000)
      .click('.MuiSwitchBase-input-73')
      .wait(5000)
      .click('.MuiSvgIcon-root-83, .DripTableToolbarSelect-deleteIcon-191')
      .wait(5000)
      .evaluate(() => {        
        return document.querySelector('h3.MuiTypography-root-142.MuiTypography-subheading-149.DripTableBody-emptyTitle-116').innerText
      })
      .end()
      .then((text) => {
        assert.equal(text, 'Sorry, no matching records found')
        done()
      })
      .catch((err) => {
      })
  })
})