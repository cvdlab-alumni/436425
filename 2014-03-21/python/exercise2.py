from exercise1 import *

height = 4
glass_material = [0.1,0.2,0.3,0.5,  0,0,0,0.5,  2,2,2,0.5, 0,0,0,0.5, 100]
"""
SOUTH VIEW
"""

wnd_width = 0.3
wnd_x = 8
wnd_y = 4

def build_window(width):
	def build_window_tmp1(x):
		def build_window_tmp2(y):
			base = PROD([Q(x),Q(y)])
			hole = T([1,2])([width,width])(PROD([Q(x-width*2),Q(y-width*2)]))
			edge = DIFFERENCE([base,hole])
			return STRUCT([edge, MATERIAL(glass_material)(hole)])
		return build_window_tmp2
	return build_window_tmp1

window = build_window(0.3)(8)(4)

# x = PROD([Q(3),Q(6)])
# x = PROD([x,Q(0.3)])
# x = MATERIAL([0.1,0.2,0.3,0.5,  0,0,0,0.5,  2,2,2,0.5, 0,0,0,0.5, 100])(x)

south = STRUCT([window,])



# south = R([2,3])(PI/2)(south)

VIEW(south)

# VIEW(two_and_half_model)