from exercise1 import *

height = 4
glass_material = [0.1,0.2,0.3,0.5,  0,0,0,0.5,  2,2,2,0.5, 0,0,0,0.5, 100]

"""
WINDOWS
"""

wnd_width = 0.05

def build_window(width):
	def build_window_tmp1(x):
		def build_window_tmp2(y):
			base = PROD([Q(x),Q(y)])
			hole = T([1,2])([width,width])(PROD([Q(x-width*2),Q(y-width*2)]))
			edge = DIFFERENCE([base,hole])
			return STRUCT([edge, MATERIAL(glass_material)(hole)])
		return build_window_tmp2
	return build_window_tmp1

"""
SOUTH VIEW
"""

# single windows
single_big_window = build_window(wnd_width)(4-c_size/2)(height)
double_big_window = STRUCT( NN(2)([ single_big_window,T(1)(4-c_size/2)]))
small_window = build_window(wnd_width)(2-c_size/2)(height)
# assemble all windows
small_windows = STRUCT(NN(2)([small_window,T(1)(18+c_size/2)]))
big_windows = STRUCT(NN(2)([ T(1)(2+c_size/2)(double_big_window),T(1)(8) ]))
windows = STRUCT([small_windows,big_windows])
# walls
wall_part = T(1)(2-c_size/2)(PROD([Q(c_size),Q(height)]))
walls = STRUCT(  NN(3)([ wall_part , T(1)(8)  ])  )
# assemble south view
south = STRUCT([COLOR(BLUE)(windows),COLOR(CYAN)(walls)])
# rotate in vertical plane
south = R([2,3])(PI/2)(south)

"""
NORTH VIEW
"""

# north view is identical to the south view, but in the opposite direction
north =  T(1)(20)(R([1,2])(PI)(south))

"""
EAST VIEW
"""

# build and assemble windows
east_window_1 = build_window(wnd_width)(4.05)(height)
east_window_2 = build_window(wnd_width)(3.7)(height)
east = STRUCT([east_window_1, T(1)(4.05+2.6)(east_window_2)])
# rotate in vertical plane
east = R([1,2])(-PI/2)(R([2,3])(PI/2)(COLOR(BLUE)(east)))

"""
WEST VIEW
"""

# build and assemble windows
west_window = build_window(wnd_width)(3.45)(height)
west = STRUCT(NN(3)([west_window,T(1)(3.45)]))
# rotate in vertical plane
west = R([1,2])(PI/2)(R([2,3])(PI/2)(COLOR(BLUE)(west)))

side_views = STRUCT ([ T([1,2,3])([16-c_size/2,6,10])(south), T([1,2,3])([16-c_size/2,21,10])(north), 
	T([1,2,3])([6,8.15+10.35+c_size,10])(east), T([1,2,3])([38,8.15+c_size,10])(west)])

"""
MOCK UP 3D
"""

mock_up_3D = STRUCT([ two_and_half_model, side_views ])

VIEW(mock_up_3D)