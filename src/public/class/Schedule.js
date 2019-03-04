/**
 * @desc Schedule.
 * @author pkeros
 * @date 2018/10/23
 * @mail pkeros@vip.qq.com
 */

import EventBus from './EventBus.js'
import { requestAF, cancelAF } from '../../component/utils/requestAnimationFrame.js'

export default class Schedule {
  /**
   * @desc work frequency.
   * @type {number}
   * @private
   */
  _frequency = 77

  /**
   * @desc event bus.
   * @type {null|object}
   * @private
   */
  _eventBus = null

  /**
   * @desc id.
   * @type {null}
   * @private
   */
  _id = null

  /**
   * @desc schedule is stop.
   * @type {boolean}
   * @private
   */
  _stopFlag = false

  /**
   * @desc Schedule constructor.
   * @param {number} frequency work frequency.
   */
  constructor ({frequency = 77}) {
    this.frequency = frequency

    this._eventBus = new EventBus()
    this._id = requestAF(this._scheduleHandler.bind(this))
  }

  /**
   * @desc schedule handler.
   * @private
   */
  _scheduleHandler () {
    if (!this._stopFlag) {
      this._eventBus.emit('task')
    }

    setTimeout(() => requestAF(this._scheduleHandler.bind(this)), this._frequency)
  }

  /**
   * @desc add a task to this scheduler.
   * @param {Function} func task.
   */
  addTask (func) {
    this._eventBus.on('task', func)
  }

  /**
   * @desc destroy this scheduler.
   */
  destroy () {
    cancelAF(this._id)

    this._eventBus.destroy()
    this._id = null
  }

  /**
   * @desc pause or resume schedule.
   */
  pauseResume () {
    if (!this._id) {
      throw new Error('this scheduler have destroyed!')
    }

    this._stopFlag = !this._stopFlag
  }

  /**
   * @desc return this scheduler whether stop.
   * @returns {boolean}
   */
  isStop () {
    return this._stopFlag
  }
}
