from exercise1 import *

"""
SOUTH VIEW
"""
# single windows
single_big_window = build_window_3D(wnd_width)(4-c_size/2)(4)
double_big_window = STRUCT( NN(2)([ single_big_window,T(1)(4-c_size/2)]))
small_window = build_window_3D(wnd_width)(2-c_size/2)(4)
# assemble all windows
small_windows = STRUCT(NN(2)([small_window,T(1)(18+c_size/2)]))
big_windows = STRUCT(NN(2)([ T(1)(2+c_size/2)(double_big_window),T(1)(8) ]))
windows = STRUCT([small_windows,big_windows])
# walls
wall_part = T(1)(2-c_size/2)(PROD([Q(c_size),Q(4)]))
walls = STRUCT( NN(3)([wall_part,T(1)(8)]))

# 3D ASSEMBLY
walls_3D = COLOR(P_DGRAY)(PROD([walls,Q(wall_width/2)]))
south_3D = STRUCT([windows,walls_3D])
south_3D = R([2,3])(PI/2)(south_3D)

"""
NORTH VIEW
"""

# north view is identical to the south view, but in the opposite direction

# 3D ASSEMBLY
north_3D =  T(1)(20)(R([1,2])(PI)(south_3D))

"""
EAST VIEW
"""

# build and assemble windows
east_window_1 = build_window_3D(wnd_width)(4.05)(4)
east_window_2 = build_window_3D(wnd_width)(3.7)(4)

# 3D ASSEMBLY
east_3D = STRUCT([east_window_1, T(1)(4.05+2.6)(east_window_2)])
east_3D = R([1,2])(-PI/2)(R([2,3])(PI/2)(east_3D))

"""
WEST VIEW
"""

# build and assemble windows
west_window = build_window_3D(wnd_width)(3.45)(4)

# 3D ASSEMBLY
west_3D = STRUCT(NN(3)([west_window,T(1)(3.45)]))
west_3D = R([1,2])(PI/2)(R([2,3])(PI/2)(west_3D))

"""
3D ASSEMBLY
"""

solid_model_3D = STRUCT ([floor0_3D,
	T([1,2])([8-c_size/2,8.15+c_size])(floor1_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+wall_width/2,1.9])(south_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+10.35-wall_width/2,1.9])(north_3D),
	T([1,2,3])([16-c_size/2,8.15+10.35+c_size,1.9])(east_3D),
	T([1,2,3])([36-c_size/2-wall_width/3,8.15+c_size,1.9])(west_3D),
	T([1,2,3])([8-c_size/2,8.15+c_size,0])(roof_3D)])

VIEW(solid_model_3D)