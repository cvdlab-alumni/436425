from pyplasm import *

"""
VARIABLES
"""

c_size = 0.27
c_width = c_size/10
height = 4
glass_material = [0.1,0.2,0.3,0.5,  0,0,0,0.5,  2,2,2,0.5, 0,0,0,0.5, 100]

"""
COLUMN
"""

column_p1 = STRUCT(NN(2)([ PROD([Q(c_size),Q(c_width)]) ,T(2)(c_size-c_width)]))
column_p2 = PROD([QUOTE([-c_size/2+c_width/2,c_width]), QUOTE([-c_width,c_size-c_width*2,-c_width])])
column =  (STRUCT([column_p1,column_p2]))

"""
LOWER TERRACE (floor0)
"""

# floor0 - base and tiles
floor0_base = PROD([Q(20),Q(8.15)])
floor0_tiles = PROD([QUOTE([-0.05,19.90,-0.05]),QUOTE([-0.05,8.05,-0.05])])

# duplicate columns: front/rear column rows
column_row1_f0 = STRUCT(NN(3)([ T([1,2])([2-c_size/2,-c_size])(column) , T(1)(8)]))
column_row2_f0 = STRUCT(NN(2)([ T([1,2])([10-c_size,8.15])(column) , T(1)(8)]))
columns_f0 = STRUCT([column_row1_f0,column_row2_f0])

# assemble floor0 TODO REMOVE
floor0 = STRUCT([floor0_base,T(3)(0.001)(COLOR(BROWN)(floor0_tiles)),COLOR(RED)(columns_f0)])

"""
UPPER TERRACE + ROOMS (floor1)
"""

# floor1 - base and tiles
floor1_base = PROD([Q(28),Q(10.35)])
floor1_tiles = PROD([QUOTE([-0.05,7.85,-0.05]),QUOTE([-0.05,10.25,-0.05])])

# duplicate columns: front/rear column rows
column_row1_f1 = STRUCT(NN(4)([T([1,2])([2-c_size/2,-c_size])(column),T(1)(8)]))
column_row2_f1 = STRUCT(NN(2)([column_row1_f1,T(2)(10.35+c_size)]))
columns_f1 = STRUCT([column_row1_f1,column_row2_f1])

# EXTERNAL WALLS TODO REMOVE ????
w_width = 0.15
# sud,north,west wall
s_wall = PROD([QUOTE([-8,20]),Q(w_width)])
n_wall = PROD([QUOTE([-8,20]),QUOTE([-10.35+w_width,w_width])])
w_wall = PROD([QUOTE([-28+w_width,w_width]),Q(10.35)])
# east wall - door
e_wall_full = PROD([QUOTE([-8,w_width]),Q(10.35)])
e_door = PROD([QUOTE([-8,w_width]),QUOTE([-3.7,2.6,-4.05])])
e_wall = DIFFERENCE([e_wall_full,e_door])
# assemble external walls
ext_walls = STRUCT([s_wall,n_wall,w_wall,e_wall])

# INTERNAL WALLS
# walls 1 and 2 - door
w_1_full = PROD([QUOTE([-8-6.5,w_width/2]),QUOTE([-4.4,4.5])])
w_1_door = PROD([QUOTE([-8-6.5,w_width/2]),QUOTE([-5.7,0.96])])
w_1 = DIFFERENCE([w_1_full,w_1_door])
w_1_2 = STRUCT(NN(2)([w_1,T(1)(9)]))
# wall 3
w_3 = PROD([QUOTE([-8-6.5-w_width/2,9]),QUOTE([-4.8,w_width*1.5])])
# wall 4 and 5 - door
w_4_full = PROD([QUOTE([-8-9.5,w_width/2]),QUOTE([-4.8-w_width*1.5,2.8])])
w_4_5_full = STRUCT(NN(2)([w_4_full,T(1)(3)]))
w_4_door = PROD([QUOTE([-8-9.5,w_width/2]),QUOTE([-5.7,0.96])])
w_4_5 = DIFFERENCE([w_4_5_full,w_4_door])
# wall 6
w_6_verts = [ [8+6.5+w_width/2,8],[8+14,8],[8+14,7.7],[8+15.5,7.7],[8+15.5,7.7-w_width/2],
	[8+12.5,7.7-w_width/2],[8+12.5,7.8],[8+9.5,7.8],[8+9.5,7.8+w_width/2],[8+6.5+w_width/2,7.8+w_width/2]]
w_6_cells = [[1,2,9,10],[9,2,8],[8,2,7],[7,2,3],[7,3,6],[3,4,5,6]]
w_6 = MKPOL([w_6_verts,w_6_cells,None])
# assemble internal walls
int_walls = STRUCT([w_1_2,w_3,w_4_5,w_6])

# wardrobe
wrdb = PROD([QUOTE([-8-16.5,1]),QUOTE([-0.74,4.45])])

# assemble floor1 TODO REMOVE
floor1 = STRUCT([floor1_base,T(3)(0.001)(COLOR(BROWN)(floor1_tiles)),COLOR(RED)(columns_f1),
	T(3)(0.002)(COLOR(CYAN)(ext_walls)),T(3)(0.002)(COLOR(BLUE)(int_walls)),T(3)(0.002)(COLOR(MAGENTA)(wrdb))])

"""
ROOF
"""

# roof parts
roof_p1 = PROD([Q(28),Q(10.35)])
roof_p2 = T([1,2])([-0.1,-0.1])(PROD([Q(28+0.2),Q(10.35+0.2)]))
















"""
WINDOWS
"""

wnd_width = 0.05

def build_window_3D(width):
	def build_window_tmp1(x):
		def build_window_tmp2(y):
			base = PROD([Q(x),Q(y)])
			hole = T([1,2])([width,width])(PROD([Q(x-width*2),Q(y-width*2)]))
			edge = DIFFERENCE([base,hole])
			edge_3D = PROD([edge,Q(width)])
			return STRUCT([COLOR(P_DGRAY)(edge_3D), MATERIAL(glass_material)( T(3)(width/3)(hole))])
		return build_window_tmp2
	return build_window_tmp1

"""
SOUTH VIEW
"""
# single windows
single_big_window = build_window_3D(wnd_width)(4-c_size/2)(height)
double_big_window = STRUCT( NN(2)([ single_big_window,T(1)(4-c_size/2)]))
small_window = build_window_3D(wnd_width)(2-c_size/2)(height)
# assemble all windows
small_windows = STRUCT(NN(2)([small_window,T(1)(18+c_size/2)]))
big_windows = STRUCT(NN(2)([ T(1)(2+c_size/2)(double_big_window),T(1)(8) ]))
windows = STRUCT([small_windows,big_windows])
# walls
wall_part = T(1)(2-c_size/2)(PROD([Q(c_size),Q(height)]))
walls = STRUCT( NN(3)([wall_part,T(1)(8)]))

"""
NORTH VIEW
"""

# north view is identical to the south view, but in the opposite direction

"""
EAST VIEW
"""

# build and assemble windows
east_window_1 = build_window_3D(wnd_width)(4.05)(height)
east_window_2 = build_window_3D(wnd_width)(3.7)(height)

"""
WEST VIEW
"""

# build and assemble windows
west_window = build_window_3D(wnd_width)(3.45)(height)

"""
3D ASSEMBLE
"""

# floor0
floor0_base_3D = COLOR(P_GRAY)(PROD([floor0_base,QUOTE([-0.7,0.4])]))
floor0_tiles_3D = COLOR(P_BROWN)(PROD([floor0_tiles,QUOTE([-1.1,0.03])]))
columns_f0_3D = COLOR(P_DGRAY)(PROD([columns_f0,Q(1)]))
floor0_3D = STRUCT([floor0_base_3D, floor0_tiles_3D ,columns_f0_3D ])

# floor1
floor1_base_3D = COLOR(P_GRAY)(PROD([floor1_base,QUOTE([-1.5,0.4])]))
floor1_tiles_3D = COLOR(P_BROWN)(PROD([floor1_tiles,QUOTE([-1.9,0.03])]))
columns_f1_3D = COLOR(P_DGRAY)(PROD([columns_f1,Q(6.3)]))
int_walls_3D = COLOR(P_WOOD)(PROD([int_walls,QUOTE([-1.9,4])]))
wrdb_3D = COLOR(P_DWOOD)(PROD([wrdb,QUOTE([-1.9,3])]))
floor1_3D = STRUCT([floor1_base_3D, floor1_tiles_3D ,columns_f1_3D, int_walls_3D ,wrdb_3D ])

# south
walls_3D = COLOR(P_DGRAY)(PROD([walls,Q(w_width/2)]))
south_3D = STRUCT([windows,walls_3D])
south_3D = R([2,3])(PI/2)(south_3D)

# north
north_3D =  T(1)(20)(R([1,2])(PI)(south_3D))

# east
east_3D = STRUCT([east_window_1, T(1)(4.05+2.6)(east_window_2)])
east_3D = R([1,2])(-PI/2)(R([2,3])(PI/2)(east_3D))

# west
west_3D = STRUCT(NN(3)([west_window,T(1)(3.45)]))
west_3D = R([1,2])(PI/2)(R([2,3])(PI/2)(west_3D))

#roof
roof_p1_3D = COLOR(P_GRAY)(PROD([roof_p1,QUOTE([-5.9,0.4])]))
roof_p2_3D = COLOR(P_DGRAY)(PROD([roof_p2,QUOTE([-6.3,0.2])]))
roof_3D = STRUCT([roof_p1_3D,roof_p2_3D])

solid_model_3D = STRUCT ([floor0_3D, T([1,2])([8-c_size/2,8.15+c_size])(floor1_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+w_width/2,1.9])(south_3D),
	T([1,2,3])([16-c_size/2,8.15+c_size+10.35-w_width/2,1.9])(north_3D),
	T([1,2,3])([16-c_size/2,8.15+10.35+c_size,1.9])(east_3D),
	T([1,2,3])([36-c_size/2-w_width/3,8.15+c_size,1.9])(west_3D),
	T([1,2,3])([8-c_size/2,8.15+c_size,0])(roof_3D)])

VIEW(solid_model_3D)