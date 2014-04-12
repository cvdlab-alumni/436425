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
east_window_door = build_window_3D(wnd_width)(2.6)(4)
east_doorknob = COLOR(P_GRAY)(CUBOID([0.1,0.1,0.03]))

# 3D ASSEMBLY
east_3D = STRUCT([east_window_1, 
	T(1)(4.05+2.6)(east_window_2), 
	T([1,3])([3.05,-0.05])(east_window_door),
	T([1,2,3])([5.5,1.8])(east_doorknob)])
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
STAIRS
"""

# step
p1 = PROD([Q(0.5),QUOTE([-0.25,0.09])])
p2 = PROD([QUOTE([-0.225,0.04]),QUOTE([-0.16,0.09])])
p3_verts = [ [0,0],[0,0.05],[0.5,0.25],[0.5,0.20] ]
p3 = MKPOL([p3_verts, [[1,2,3,4]], None])

step_2D_partial = STRUCT([p2,p3])
p1_3D = COLOR(P_DGRAY)(R([2,3])(PI/2)(PROD([p1,Q(4.5)])))
step_3D_partial = R([2,3])(PI/2)( PROD([step_2D_partial,Q(4.5)]))
step_3D = STRUCT([p1_3D,step_3D_partial])

# STAIRS
stairs = STRUCT(NN(4)([step_3D,T([1,3])([0.5,0.2])]))
stairs = T([1,2,3])([11,-2,0.2]) (R([1,2])(PI/2)(stairs))

double_stairs = STRUCT(NN(2)([stairs,T([2,3])([8.15+c_size,0.8])]))

"""
3D ASSEMBLY
"""

house_model_3D = STRUCT ([floor0_3D, double_stairs,
	T([1,2])([8-c_size/2,8.15+c_size])(floor1_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+wall_width/2,1.9])(south_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+10.35-wall_width/2,1.9])(north_3D),
	T([1,2,3])([16-c_size/2,8.15+10.35+c_size,1.9])(east_3D),
	T([1,2,3])([36-c_size/2-wall_width/3,8.15+c_size,1.9])(west_3D),
	T([1,2,3])([8-c_size/2,8.15+c_size,0])(roof_3D)])

VIEW(house_model_3D)