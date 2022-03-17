 let SCREEN_SIZE;

 /**
  * The values in the below object are percentages of the screen
  */
 class AllSwipeAction{

 SWIPE_DIRECTION = {
   down: {
     start: { x: 50, y: 15 },
     end: { x: 50, y: 85 },
   },
   left: {
     start: { x: 95, y: 50 },
     end: { x: 5, y: 50 },
   },
   right: {
     start: { x: 5, y: 50 },
     end: { x: 95, y: 50 },
   },
   up: {
     start: { x: 50, y: 50 },
     end: { x: 50, y: 15 },
   },
 };
 
 
 /**
  * Check if an element is visible and if not scroll down a portion of the screen to
  * check if it visible after a x amount of scrolls
  *
  * @param {element} element
  * @param {number} maxScrolls
  * @param {number} amount
  */
 checkIfVisibleWithScrollDown(element, maxScrolls, amount = 0) {
   if ((!element.isExisting() || !element.isVisible()) && amount <= maxScrolls) {
     this.swipeUp(0.85);
     this.checkIfVisibleWithScrollDown(element, maxScrolls, amount + 1);
   } else if (amount > maxScrolls) {
     throw new Error(`The element '${element}' could not be found or is not visible.`);
   }
 }
 
 /**
  * Swipe down based on a percentage
  * @param {float} percentage
  */
 swipeDown(percentage = 1) {
   this.swipeOnPercentage(this.calculateXY(this.SWIPE_DIRECTION.down.start, percentage), this.calculateXY(this.SWIPE_DIRECTION.down.end, percentage));
 }
 
 /**
  * Swipe Up based on a percentage
  * @param {float} percentage from 0 - 1
  */
 swipeUp(percentage = 1) {
   this.swipeOnPercentage(this.calculateXY(this.SWIPE_DIRECTION.up.start, percentage), this.calculateXY(this.SWIPE_DIRECTION.up.end, percentage));
 }
 
 /**
  * Swipe left based on a percentage
  * @param {float} percentage from 0 - 1
  */
 swipeLeft(percentage = 1) {
   this.swipeOnPercentage(this.calculateXY(this.SWIPE_DIRECTION.left.start, percentage), this.calculateXY(this.SWIPE_DIRECTION.left.end, percentage));
 }
 
 /**
  * Swipe right based on a percentage
  * @param {float} percentage from 0 - 1
  */
 swipeRight(percentage = 1) {
   this.swipeOnPercentage(this.calculateXY(this.SWIPE_DIRECTION.right.start, percentage), this.calculateXY(this.SWIPE_DIRECTION.right.end, percentage));
 }
 
 
 /**
  * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
  * percentages of the screen.
  * @param {object} from { x: 50, y: 50 }
  * @param {object} to { x: 25, y: 25 }
  * @example
  * <pre>
  *   // This is a swipe to the left
  *   from = { x: 50, y:50 }
  *   to = { x: 25, y:50 }
  * </pre>
  */
 swipeOnPercentage(from, to) {
   SCREEN_SIZE = SCREEN_SIZE || driver.getWindowRect();
   let pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
   let moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, to);
   this.swipe(
     pressOptions,
     moveToScreenCoordinates,
   );
 }
 
 /**
  * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
  *
  * @param {object} from { x: 50, y: 50 }
  * @param {object} to { x: 25, y: 25 }
  *
  * @example
  * <pre>
  *   // This is a swipe to the left
  *   from = { x: 50, y:50 }
  *   to = { x: 25, y:50 }
  * </pre>
  */
 swipe(from, to) {
   browser.touchPerform([{
     action: 'press',
     options: from,
   }, {
     action: 'wait',
     options: { ms: 1000 },
   }, {
     action: 'moveTo',
     options: to,
   }, {
     action: 'release',
   }]);
   browser.pause(1000);
 }
 
 /**
  * Get the screen coordinates based on a device his screensize
  * @param {number} screenSize the size of the screen
  * @param {object} coordinates like { x: 50, y: 50 }
  * @return {{x: number, y: number}}
  */
 getDeviceScreenCoordinates(screenSize, coordinates) {
   return {
     x: Math.round(screenSize.width * (coordinates.x / 100)),
     y: Math.round(screenSize.height * (coordinates.y / 100)),
   };
 }
 
 /**
  * Calculate the x y coordinates based on a percentage
  * @param {object} coordinates
  * @param {float} percentage
  * @return {{x: number, y: number}}
  */
 calculateXY({ x, y }, percentage) {
   return {
     x: x * percentage,
     y: y * percentage,
   };
 }
}

module.exports = new AllSwipeAction();
