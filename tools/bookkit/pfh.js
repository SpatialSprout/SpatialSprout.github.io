/* perfect-freehand (MIT, (c) 2021 Stephen Ruiz Ltd) — bundled for the SpatialSprout books; exposes window.PFH.getStroke */
(function(){
/* constants */
/**
 * Constants used throughout the stroke generation algorithm.
 * @internal
 */

const { PI } = Math

/**
 * Rate of change for simulated pressure.
 * Controls how quickly pressure changes based on drawing velocity.
 * Higher values make pressure more responsive to speed changes.
 */
const RATE_OF_PRESSURE_CHANGE = 0.275

/**
 * PI with a tiny offset to fix browser rendering artifacts.
 * Some browsers render strokes incorrectly when using exact PI.
 */
const FIXED_PI = PI + 0.0001

/**
 * Number of segments for rounded start caps.
 */
const START_CAP_SEGMENTS = 13

/**
 * Number of segments for rounded end caps.
 * Higher than start caps for smoother appearance at stroke endings.
 */
const END_CAP_SEGMENTS = 29

/**
 * Number of segments for sharp corner caps.
 */
const CORNER_CAP_SEGMENTS = 13

/**
 * Pixels to skip at the end of a stroke to reduce noise.
 */
const END_NOISE_THRESHOLD = 3

/**
 * Minimum interpolation factor for streamline.
 * Used when streamline is at maximum (1.0).
 */
const MIN_STREAMLINE_T = 0.15

/**
 * Range for interpolation factor calculation.
 * Added to MIN_STREAMLINE_T based on (1 - streamline).
 */
const STREAMLINE_T_RANGE = 0.85

/**
 * Minimum stroke radius to prevent invisible strokes.
 */
const MIN_RADIUS = 0.01

/**
 * Default pressure for the first point of a stroke.
 * Lower than subsequent points to prevent fat starts,
 * since drawn lines almost always start slow.
 */
const DEFAULT_FIRST_PRESSURE = 0.25

/**
 * Default pressure for subsequent points when no pressure is provided.
 */
const DEFAULT_PRESSURE = 0.5

/**
 * Unit offset vector used as placeholder for initial vector
 * and for creating a second point when only one point is provided.
 */
const UNIT_OFFSET                   = [1, 1]

/* vec */
                                   

/**
 * Negate a vector.
 * @param A
 * @internal
 */
function neg(A      )       {
  return [-A[0], -A[1]]
}

/**
 * Add vectors.
 * @param A
 * @param B
 * @internal
 */
function add(A      , B      )       {
  return [A[0] + B[0], A[1] + B[1]]
}

/**
 * Add vectors into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @param B
 * @internal
 */
function addInto(out      , A      , B      )       {
  out[0] = A[0] + B[0]
  out[1] = A[1] + B[1]
  return out
}

/**
 * Subtract vectors.
 * @param A
 * @param B
 * @internal
 */
function sub(A      , B      )       {
  return [A[0] - B[0], A[1] - B[1]]
}

/**
 * Subtract vectors into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @param B
 * @internal
 */
function subInto(out      , A      , B      )       {
  out[0] = A[0] - B[0]
  out[1] = A[1] - B[1]
  return out
}

/**
 * Vector multiplication by scalar
 * @param A
 * @param n
 * @internal
 */
function mul(A      , n        )       {
  return [A[0] * n, A[1] * n]
}

/**
 * Vector multiplication by scalar into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @param n
 * @internal
 */
function mulInto(out      , A      , n        )       {
  out[0] = A[0] * n
  out[1] = A[1] * n
  return out
}

/**
 * Vector division by scalar.
 * @param A
 * @param n
 * @internal
 */
function div(A      , n        )       {
  return [A[0] / n, A[1] / n]
}

/**
 * Perpendicular rotation of a vector A
 * @param A
 * @internal
 */
function per(A      )       {
  return [A[1], -A[0]]
}

/**
 * Perpendicular rotation into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @internal
 */
function perInto(out      , A      )       {
  const temp = A[0]
  out[0] = A[1]
  out[1] = -temp
  return out
}

/**
 * Dot product
 * @param A
 * @param B
 * @internal
 */
function dpr(A      , B      )         {
  return A[0] * B[0] + A[1] * B[1]
}

/**
 * Get whether two vectors are equal.
 * @param A
 * @param B
 * @internal
 */
function isEqual(A      , B      )          {
  return A[0] === B[0] && A[1] === B[1]
}

/**
 * Length of the vector
 * @param A
 * @internal
 */
function len(A      )         {
  return Math.hypot(A[0], A[1])
}

/**
 * Length of the vector squared
 * @param A
 * @internal
 */
function len2(A      )         {
  return A[0] * A[0] + A[1] * A[1]
}

/**
 * Dist length from A to B squared (inlined for performance).
 * @param A
 * @param B
 * @internal
 */
function dist2(A      , B      )         {
  const dx = A[0] - B[0]
  const dy = A[1] - B[1]
  return dx * dx + dy * dy
}

/**
 * Get normalized / unit vector.
 * @param A
 * @internal
 */
function uni(A      )       {
  return div(A, len(A))
}

/**
 * Dist length from A to B
 * @param A
 * @param B
 * @internal
 */
function dist(A      , B      )         {
  return Math.hypot(A[1] - B[1], A[0] - B[0])
}

/**
 * Mean between two vectors or mid vector between two vectors
 * @param A
 * @param B
 * @internal
 */
function med(A      , B      )       {
  return mul(add(A, B), 0.5)
}

/**
 * Rotate a vector around another vector by r (radians)
 * @param A vector
 * @param C center
 * @param r rotation in radians
 * @internal
 */
function rotAround(A      , C      , r        )       {
  const s = Math.sin(r)
  const c = Math.cos(r)

  const px = A[0] - C[0]
  const py = A[1] - C[1]

  const nx = px * c - py * s
  const ny = px * s + py * c

  return [nx + C[0], ny + C[1]]
}

/**
 * Rotate a vector around another vector by r (radians) into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A vector
 * @param C center
 * @param r rotation in radians
 * @internal
 */
function rotAroundInto(out      , A      , C      , r        )       {
  const s = Math.sin(r)
  const c = Math.cos(r)

  const px = A[0] - C[0]
  const py = A[1] - C[1]

  const nx = px * c - py * s
  const ny = px * s + py * c

  out[0] = nx + C[0]
  out[1] = ny + C[1]
  return out
}

/**
 * Interpolate vector A to B with a scalar t
 * @param A
 * @param B
 * @param t scalar
 * @internal
 */
function lrp(A      , B      , t        )       {
  return add(A, mul(sub(B, A), t))
}

/**
 * Interpolate vector A to B with a scalar t into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @param B
 * @param t scalar
 * @internal
 */
function lrpInto(out      , A      , B      , t        )       {
  const dx = B[0] - A[0]
  const dy = B[1] - A[1]
  out[0] = A[0] + dx * t
  out[1] = A[1] + dy * t
  return out
}

/**
 * Project a point A in the direction B by a scalar c
 * @param A
 * @param B
 * @param c
 * @internal
 */
function prj(A      , B      , c        )       {
  return add(A, mul(B, c))
}

/**
 * Project a point A in the direction B by a scalar c into an existing output vector (allocation-free).
 * @param out Output vector to mutate
 * @param A
 * @param B
 * @param c
 * @internal
 */
function prjInto(out      , A      , B      , c        )       {
  out[0] = A[0] + B[0] * c
  out[1] = A[1] + B[1] * c
  return out
}

/* getStrokeRadius */
/**
 * Compute a radius based on the pressure.
 * @param size
 * @param thinning
 * @param pressure
 * @param easing
 * @internal
 */
function getStrokeRadius(
  size        ,
  thinning        ,
  pressure        ,
  easing                        = (t) => t
) {
  return size * easing(0.5 - thinning * (0.5 - pressure))
}

/* simulatePressure */

const { min } = Math

/**
 * Simulate pressure based on the distance between points and stroke size.
 * This creates a natural-looking pressure effect based on drawing velocity.
 *
 * @param prevPressure The previous pressure value
 * @param distance The distance from the previous point
 * @param size The base stroke size
 * @returns The simulated pressure value (0-1)
 * @internal
 */
function simulatePressure(
  prevPressure        ,
  distance        ,
  size        
)         {
  // Speed of change - how fast should the pressure be changing?
  const sp = min(1, distance / size)
  // Rate of change - how much of a change is there?
  const rp = min(1, 1 - sp)
  // Accelerate the pressure
  return min(
    1,
    prevPressure + (rp - prevPressure) * (sp * RATE_OF_PRESSURE_CHANGE)
  )
}

/* getStrokePoints */


// Scratch buffer for allocation-free vector calculation in hot loop
const _vectorDiff       = [0, 0]

/**
 * Check if a pressure value is valid (defined and non-negative).
 * Returns false for undefined, NaN, and negative values.
 */
function isValidPressure(pressure                    )                     {
  return pressure != null && pressure >= 0
}

/**
 * ## getStrokePoints
 * @description Get an array of points as objects with an adjusted point, pressure, vector, distance, and runningLength.
 * @param points An array of points (as `[x, y, pressure]` or `{x, y, pressure}`). Pressure is optional in both cases.
 * @param options (optional) An object with options.
 * @param options.size	The base size (diameter) of the stroke.
 * @param options.thinning The effect of pressure on the stroke's size.
 * @param options.smoothing	How much to soften the stroke's edges.
 * @param options.easing	An easing function to apply to each point's pressure.
 * @param options.simulatePressure Whether to simulate pressure based on velocity.
 * @param options.start Cap, taper and easing for the start of the line.
 * @param options.end Cap, taper and easing for the end of the line.
 * @param options.last Whether to handle the points as a completed stroke.
 */
function getStrokePoints 
                     
                                                        
 (points           , options = {}                 )                {
  const { streamline = 0.5, size = 16, last: isComplete = false } = options

  // If we don't have any points, return an empty array.
  if (points.length === 0) return []

  // Find the interpolation level between points.
  const t = MIN_STREAMLINE_T + (1 - streamline) * STREAMLINE_T_RANGE

  // Whatever the input is, make sure that the points are in number[][].
  let pts = Array.isArray(points[0])
    ? (points       )
    : (points       ).map(({ x, y, pressure = DEFAULT_PRESSURE }) => [
        x,
        y,
        pressure,
      ])

  // Add extra points between the two, to help avoid "dash" lines
  // for strokes with tapered start and ends. Don't mutate the
  // input array!
  if (pts.length === 2) {
    const last = pts[1]
    pts = pts.slice(0, -1)
    for (let i = 1; i < 5; i++) {
      pts.push(lrp(pts[0]        , last        , i / 4))
    }
  }

  // If there's only one point, add another point at a 1pt offset.
  // Don't mutate the input array!
  if (pts.length === 1) {
    pts = [...pts, [...add(pts[0]        , UNIT_OFFSET), ...pts[0].slice(2)]]
  }

  // The strokePoints array will hold the points for the stroke.
  // Start it out with the first point, which needs no adjustment.
  const strokePoints                = [
    {
      point: [pts[0][0], pts[0][1]],
      pressure: isValidPressure(pts[0][2]) ? pts[0][2] : DEFAULT_FIRST_PRESSURE,
      vector: [...UNIT_OFFSET],
      distance: 0,
      runningLength: 0,
    },
  ]

  // A flag to see whether we've already reached out minimum length
  let hasReachedMinimumLength = false

  // We use the runningLength to keep track of the total distance
  let runningLength = 0

  // We're set this to the latest point, so we can use it to calculate
  // the distance and vector of the next point.
  let prev = strokePoints[0]

  const max = pts.length - 1

  // Iterate through all of the points, creating StrokePoints.
  for (let i = 1; i < pts.length; i++) {
    const point       =
      isComplete && i === max
        ? // If we're at the last point, and `options.last` is true,
          // then add the actual input point.
          [pts[i][0], pts[i][1]]
        : // Otherwise, using the t calculated from the streamline
          // option, interpolate a new point between the previous
          // point the current point.
          lrp(prev.point, pts[i]        , t)

    // If the new point is the same as the previous point, skip ahead.
    if (isEqual(prev.point, point)) continue

    // How far is the new point from the previous point?
    const distance = dist(point, prev.point)

    // Add this distance to the total "running length" of the line.
    runningLength += distance

    // At the start of the line, we wait until the new point is a
    // certain distance away from the original point, to avoid noise
    if (i < max && !hasReachedMinimumLength) {
      if (runningLength < size) continue
      hasReachedMinimumLength = true
      // TODO: Backfill the missing points so that tapering works correctly.
    }
    // Create a new strokepoint (it will be the new "previous" one).
    // Use scratch buffer for vector difference to reduce allocations
    subInto(_vectorDiff, prev.point, point)
    prev = {
      // The adjusted point
      point,
      // The input pressure (or default if not specified)
      pressure: isValidPressure(pts[i][2]) ? pts[i][2] : DEFAULT_PRESSURE,
      // The vector from the current point to the previous point
      vector: uni(_vectorDiff),
      // The distance between the current point and the previous point
      distance,
      // The total distance so far
      runningLength,
    }

    // Push it to the strokePoints array.
    strokePoints.push(prev)
  }

  // Set the vector of the first point to be the same as the second point.
  strokePoints[0].vector = strokePoints[1]?.vector || [0, 0]

  return strokePoints
}

/* getStrokeOutlinePoints */




// Scratch buffers for allocation-free hot loop calculations
const _offset       = [0, 0]
const _tl       = [0, 0]
const _tr       = [0, 0]

/**
 * Draw a dot (circle) for very short strokes.
 */
function drawDot(center      , radius        )         {
  const offsetPoint = add(center, [1, 1])
  const start = prj(center, uni(per(sub(center, offsetPoint))), -radius)
  const dotPts         = []
  const step = 1 / START_CAP_SEGMENTS
  for (let t = step; t <= 1; t += step) {
    dotPts.push(rotAround(start, center, FIXED_PI * 2 * t))
  }
  return dotPts
}

/**
 * Draw a rounded start cap by rotating points from right to left around the start point.
 */
function drawRoundStartCap(
  center      ,
  rightPoint      ,
  segments        
)         {
  const cap         = []
  const step = 1 / segments
  for (let t = step; t <= 1; t += step) {
    cap.push(rotAround(rightPoint, center, FIXED_PI * t))
  }
  return cap
}

/**
 * Draw a flat start cap with squared-off edges.
 */
function drawFlatStartCap(
  center      ,
  leftPoint      ,
  rightPoint      
)         {
  const cornersVector = sub(leftPoint, rightPoint)
  const offsetA = mul(cornersVector, 0.5)
  const offsetB = mul(cornersVector, 0.51)
  return [
    sub(center, offsetA),
    sub(center, offsetB),
    add(center, offsetB),
    add(center, offsetA),
  ]
}

/**
 * Draw a rounded end cap (1.5 turns to handle sharp end turns correctly).
 */
function drawRoundEndCap(
  center      ,
  direction      ,
  radius        ,
  segments        
)         {
  const cap         = []
  const start = prj(center, direction, radius)
  const step = 1 / segments
  for (let t = step; t < 1; t += step) {
    cap.push(rotAround(start, center, FIXED_PI * 3 * t))
  }
  return cap
}

/**
 * Draw a flat end cap with squared-off edges.
 */
function drawFlatEndCap(center      , direction      , radius        )         {
  return [
    add(center, mul(direction, radius)),
    add(center, mul(direction, radius * 0.99)),
    sub(center, mul(direction, radius * 0.99)),
    sub(center, mul(direction, radius)),
  ]
}

/**
 * Compute the taper distance from a taper option value.
 * - false or undefined: no taper (0)
 * - true: taper the full length (max of size and totalLength)
 * - number: use that exact taper distance
 */
function computeTaperDistance(
  taper                              ,
  size        ,
  totalLength        
)         {
  if (taper === false || taper === undefined) return 0
  if (taper === true) return Math.max(size, totalLength)
  return taper
}

/**
 * Compute the initial pressure by averaging the first few points.
 * This prevents "fat starts" since drawn lines almost always start slow.
 */
function computeInitialPressure(
  points               ,
  shouldSimulatePressure         ,
  size        
)         {
  return points.slice(0, 10).reduce((acc, curr) => {
    let pressure = curr.pressure
    if (shouldSimulatePressure) {
      pressure = simulatePressure(acc, curr.distance, size)
    }
    return (acc + pressure) / 2
  }, points[0].pressure)
}

/**
 * ## getStrokeOutlinePoints
 * @description Get an array of points (as `[x, y]`) representing the outline of a stroke.
 * @param points An array of StrokePoints as returned from `getStrokePoints`.
 * @param options (optional) An object with options.
 * @param options.size	The base size (diameter) of the stroke.
 * @param options.thinning The effect of pressure on the stroke's size.
 * @param options.smoothing	How much to soften the stroke's edges.
 * @param options.easing	An easing function to apply to each point's pressure.
 * @param options.simulatePressure Whether to simulate pressure based on velocity.
 * @param options.start Cap, taper and easing for the start of the line.
 * @param options.end Cap, taper and easing for the end of the line.
 * @param options.last Whether to handle the points as a completed stroke.
 */
function getStrokeOutlinePoints(
  points               ,
  options                         = {}                          
)         {
  const {
    size = 16,
    smoothing = 0.5,
    thinning = 0.5,
    simulatePressure: shouldSimulatePressure = true,
    easing = (t) => t,
    start = {},
    end = {},
    last: isComplete = false,
  } = options

  const { cap: capStart = true, easing: taperStartEase = (t) => t * (2 - t) } =
    start

  const { cap: capEnd = true, easing: taperEndEase = (t) => --t * t * t + 1 } =
    end

  // We can't do anything with an empty array or a stroke with negative size.
  if (points.length === 0 || size <= 0) {
    return []
  }

  // The total length of the line
  const totalLength = points[points.length - 1].runningLength

  const taperStart = computeTaperDistance(start.taper, size, totalLength)
  const taperEnd = computeTaperDistance(end.taper, size, totalLength)

  // The minimum allowed distance between points (squared)
  const minDistance = Math.pow(size * smoothing, 2)

  // Our collected left and right points
  const leftPts         = []
  const rightPts         = []

  // Previous pressure (averaged from first few points to prevent fat starts)
  let prevPressure = computeInitialPressure(
    points,
    shouldSimulatePressure,
    size
  )

  // The current radius
  let radius = getStrokeRadius(
    size,
    thinning,
    points[points.length - 1].pressure,
    easing
  )

  // The radius of the first saved point
  let firstRadius                     = undefined

  // Previous vector
  let prevVector = points[0].vector

  // Previous left and right points
  let prevLeftPoint = points[0].point
  let prevRightPoint = prevLeftPoint

  // Temporary left and right points
  let tempLeftPoint       = prevLeftPoint
  let tempRightPoint       = prevRightPoint

  // Keep track of whether the previous point is a sharp corner
  // ... so that we don't detect the same corner twice
  let isPrevPointSharpCorner = false

  /*
    Find the outline's left and right points

    Iterating through the points and populate the rightPts and leftPts arrays,
    skipping the first and last pointsm, which will get caps later on.
  */

  for (let i = 0; i < points.length; i++) {
    let { pressure } = points[i]
    const { point, vector, distance, runningLength } = points[i]
    const isLastPoint = i === points.length - 1

    // Removes noise from the end of the line
    if (!isLastPoint && totalLength - runningLength < END_NOISE_THRESHOLD) {
      continue
    }

    /*
      Calculate the radius

      If not thinning, the current point's radius will be half the size; or
      otherwise, the size will be based on the current (real or simulated)
      pressure.
    */

    if (thinning) {
      if (shouldSimulatePressure) {
        // If we're simulating pressure, then do so based on the distance
        // between the current point and the previous point, and the size
        // of the stroke. Otherwise, use the input pressure.
        pressure = simulatePressure(prevPressure, distance, size)
      }

      radius = getStrokeRadius(size, thinning, pressure, easing)
    } else {
      radius = size / 2
    }

    if (firstRadius === undefined) {
      firstRadius = radius
    }

    /*
      Apply tapering

      If the current length is within the taper distance at either the
      start or the end, calculate the taper strengths. Apply the smaller
      of the two taper strengths to the radius.
    */

    const taperStartStrength =
      runningLength < taperStart
        ? taperStartEase(runningLength / taperStart)
        : 1

    const taperEndStrength =
      totalLength - runningLength < taperEnd
        ? taperEndEase((totalLength - runningLength) / taperEnd)
        : 1

    radius = Math.max(
      MIN_RADIUS,
      radius * Math.min(taperStartStrength, taperEndStrength)
    )

    /* Add points to left and right */

    /*
      Handle sharp corners

      Find the difference (dot product) between the current and next vector.
      If the next vector is at more than a right angle to the current vector,
      draw a cap at the current point.
    */

    const nextVector = (!isLastPoint ? points[i + 1] : points[i]).vector
    const nextDpr = !isLastPoint ? dpr(vector, nextVector) : 1.0
    const prevDpr = dpr(vector, prevVector)

    const isPointSharpCorner = prevDpr < 0 && !isPrevPointSharpCorner
    const isNextPointSharpCorner = nextDpr !== null && nextDpr < 0

    if (isPointSharpCorner || isNextPointSharpCorner) {
      // It's a sharp corner. Draw a rounded cap and move on to the next point
      // Considering saving these and drawing them later? So that we can avoid
      // crossing future points.

      // Use mutable operations for the offset calculation
      perInto(_offset, prevVector)
      mulInto(_offset, _offset, radius)

      const step = 1 / CORNER_CAP_SEGMENTS
      for (let t = 0; t <= 1; t += step) {
        // Calculate left point: rotate (point - offset) around point
        subInto(_tl, point, _offset)
        rotAroundInto(_tl, _tl, point, FIXED_PI * t)
        tempLeftPoint = [_tl[0], _tl[1]]
        leftPts.push(tempLeftPoint)

        // Calculate right point: rotate (point + offset) around point
        addInto(_tr, point, _offset)
        rotAroundInto(_tr, _tr, point, FIXED_PI * -t)
        tempRightPoint = [_tr[0], _tr[1]]
        rightPts.push(tempRightPoint)
      }

      prevLeftPoint = tempLeftPoint
      prevRightPoint = tempRightPoint

      if (isNextPointSharpCorner) {
        isPrevPointSharpCorner = true
      }
      continue
    }

    isPrevPointSharpCorner = false

    // Handle the last point
    if (isLastPoint) {
      perInto(_offset, vector)
      mulInto(_offset, _offset, radius)
      leftPts.push(sub(point, _offset))
      rightPts.push(add(point, _offset))
      continue
    }

    /*
      Add regular points

      Project points to either side of the current point, using the
      calculated size as a distance. If a point's distance to the
      previous point on that side greater than the minimum distance
      (or if the corner is kinda sharp), add the points to the side's
      points array.
    */

    // Use mutable operations for offset calculation
    lrpInto(_offset, nextVector, vector, nextDpr)
    perInto(_offset, _offset)
    mulInto(_offset, _offset, radius)

    subInto(_tl, point, _offset)
    tempLeftPoint = [_tl[0], _tl[1]]

    if (i <= 1 || dist2(prevLeftPoint, tempLeftPoint) > minDistance) {
      leftPts.push(tempLeftPoint)
      prevLeftPoint = tempLeftPoint
    }

    addInto(_tr, point, _offset)
    tempRightPoint = [_tr[0], _tr[1]]

    if (i <= 1 || dist2(prevRightPoint, tempRightPoint) > minDistance) {
      rightPts.push(tempRightPoint)
      prevRightPoint = tempRightPoint
    }

    // Set variables for next iteration
    prevPressure = pressure
    prevVector = vector
  }

  /*
    Drawing caps

    Now that we have our points on either side of the line, we need to
    draw caps at the start and end. Tapered lines don't have caps, but
    may have dots for very short lines.
  */

  const firstPoint       = [points[0].point[0], points[0].point[1]]

  const lastPoint       =
    points.length > 1
      ? [points[points.length - 1].point[0], points[points.length - 1].point[1]]
      : add(points[0].point, [1, 1])

  const startCap         = []

  const endCap         = []

  // Draw a dot for very short or completed strokes
  if (points.length === 1) {
    if (!(taperStart || taperEnd) || isComplete) {
      return drawDot(firstPoint, firstRadius || radius)
    }
  } else {
    // Draw start cap (unless tapered)
    if (taperStart || (taperEnd && points.length === 1)) {
      // The start point is tapered, noop
    } else if (capStart) {
      startCap.push(
        ...drawRoundStartCap(firstPoint, rightPts[0], START_CAP_SEGMENTS)
      )
    } else {
      startCap.push(...drawFlatStartCap(firstPoint, leftPts[0], rightPts[0]))
    }

    // Draw end cap (unless tapered)
    const direction = per(neg(points[points.length - 1].vector))

    if (taperEnd || (taperStart && points.length === 1)) {
      // Tapered end - push the last point to the line
      endCap.push(lastPoint)
    } else if (capEnd) {
      endCap.push(
        ...drawRoundEndCap(lastPoint, direction, radius, END_CAP_SEGMENTS)
      )
    } else {
      endCap.push(...drawFlatEndCap(lastPoint, direction, radius))
    }
  }

  /*
    Return the points in the correct winding order: begin on the left side, then
    continue around the end cap, then come back along the right side, and finally
    complete the start cap.
  */

  return leftPts.concat(endCap, rightPts.reverse(), startCap)
}

/* getStroke */


/**
 * ## getStroke
 * @description Get an array of points describing a polygon that surrounds the input points.
 * @param points An array of points (as `[x, y, pressure]` or `{x, y, pressure}`). Pressure is optional in both cases.
 * @param options (optional) An object with options.
 * @param options.size	The base size (diameter) of the stroke.
 * @param options.thinning The effect of pressure on the stroke's size.
 * @param options.smoothing	How much to soften the stroke's edges.
 * @param options.easing	An easing function to apply to each point's pressure.
 * @param options.simulatePressure Whether to simulate pressure based on velocity.
 * @param options.start Cap, taper and easing for the start of the line.
 * @param options.end Cap, taper and easing for the end of the line.
 * @param options.last Whether to handle the points as a completed stroke.
 */

function getStroke(
  points                                                            ,
  options                = {}                 
)         {
  return getStrokeOutlinePoints(getStrokePoints(points, options), options)
}

window.PFH={getStroke,getStrokePoints,getStrokeOutlinePoints};
})();
