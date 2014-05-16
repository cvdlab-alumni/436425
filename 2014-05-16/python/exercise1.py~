from larcc import *

"""
VARIABLES AND COLORS
"""

c_size = 0.27	# column size
c_width = c_size/10 	# column width
wnd_width = 0.05	# window width
wall_width = 0.15	# wall width
glass_material = [0.1,0.2,0.3,1,  0,0,0,0.5,  2,2,2,1, 0,0,0,1, 100] 	# glass material matrix
water_material = [0.05,0.4,0.4,1,  0,0.3,0.3,0.5,  2,2,2,1, 0,0,0,1, 100] 	# glass material matrix

P_GRAY	= Color4f([0.9, 0.9, 0.9, 1.0])
P_DGRAY	= Color4f([0.6, 0.6, 0.6, 1.0])
P_BROWN	= Color4f([0.8, 0.7, 0.6, 1.0])
P_DBROWN= Color4f([0.61, 0.5, 0.09, 1.0])
P_SBROWN= Color4f([0.83, 0.8, 0.6, 1.0])
P_WOOD	= Color4f([0.67, 0.51, 0.25, 1.0])
P_DWOOD	= Color4f([0.56, 0.43, 0.22, 1.0])
P_GREEN = Color4f([0.05, 0.6, 0.08, 1.0])


"""
PLASM FUNCTIONS
"""

# Builds 3D window, including glass material and 3D edges
# author: Stefano Russo
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

# Generates 3D tiles on a floor
# author: Stefano Russo
def generateTiles(floor_dim,tile_num,elevation,space):
	tile_dim = [((floor_dim[0]-space)/tile_num[0])-space,
				((floor_dim[1]-space)/tile_num[1])-space]
	tile = T([1,2]) ([space,space])  (PROD([Q(tile_dim[0]),Q(tile_dim[1])]))
	tiles_line = STRUCT(NN(tile_num[0])([  tile , T(1)(tile_dim[0]+space)  ]) )
	tiles_floor = STRUCT(NN(tile_num[1])([  tiles_line , T(2)(tile_dim[1]+space)  ]))
	tiles_floor_3D = PROD([tiles_floor,QUOTE([elevation])])
	return tiles_floor_3D

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
floor0_tiles_3D =  generateTiles([20,8.15],[20,12],0.05,0.05)

# duplicate columns: front/rear column rows
column_row1_f0 = STRUCT(NN(3)([ T([1,2])([2-c_size/2,-c_size])(column) , T(1)(8)]))
column_row2_f0 = STRUCT(NN(2)([ T([1,2])([10-c_size,8.15])(column) , T(1)(8)]))
columns_f0 = STRUCT([column_row1_f0,column_row2_f0])

# 3D ASSEMBLY
floor0_base_3D = COLOR(P_GRAY)(PROD([floor0_base,QUOTE([-0.7,0.4])]))
floor0_tiles_3D = COLOR(P_BROWN)(T(3)(1.1)(floor0_tiles_3D))
columns_f0_3D = COLOR(P_DGRAY)(PROD([columns_f0,Q(1)]))
floor0_3D = STRUCT([floor0_base_3D, floor0_tiles_3D ,columns_f0_3D ])

"""
UPPER TERRACE + ROOMS (floor1)
"""

# floor1 - base and tiles
floor1_base = PROD([Q(28),Q(10.35)])
floor1_tiles_3D =  generateTiles([7.95,10.35],[8,15],0.05,0.05)

# duplicate columns: front/rear column rows
column_row1_f1 = STRUCT(NN(4)([T([1,2])([2-c_size/2,-c_size])(column),T(1)(8)]))
column_row2_f1 = STRUCT(NN(2)([column_row1_f1,T(2)(10.35+c_size)]))
columns_f1 = STRUCT([column_row1_f1,column_row2_f1])

# INTERNAL WALLS
# walls 1 and 2 - door
w_1_full = PROD([QUOTE([-8-6.5,wall_width/2]),QUOTE([-4.4,4.5])])
w_1_door = PROD([QUOTE([-8-6.5,wall_width/2]),QUOTE([-5.7,0.96])])
w_1 = DIFFERENCE([w_1_full,w_1_door])
w_1_2 = STRUCT(NN(2)([w_1,T(1)(9)]))
# wall 3
w_3 = PROD([QUOTE([-8-6.5-wall_width/2,9]),QUOTE([-4.8,wall_width*1.5])])
# wall 4 and 5 - door
w_4_full = PROD([QUOTE([-8-9.5,wall_width/2]),QUOTE([-4.8-wall_width*1.5,2.8])])
w_4_5_full = STRUCT(NN(2)([w_4_full,T(1)(3)]))
w_4_door = PROD([QUOTE([-8-9.5,wall_width/2]),QUOTE([-5.7,0.96])])
w_4_5 = DIFFERENCE([w_4_5_full,w_4_door])
# wall 6
w_6_verts = [ [8+6.5+wall_width/2,8],[8+14,8],[8+14,7.7],[8+15.5,7.7],[8+15.5,7.7-wall_width/2],
	[8+12.5,7.7-wall_width/2],[8+12.5,7.8],[8+9.5,7.8],[8+9.5,7.8+wall_width/2],[8+6.5+wall_width/2,7.8+wall_width/2]]
w_6_cells = [[1,2,9,10],[9,2,8],[8,2,7],[7,2,3],[7,3,6],[3,4,5,6]]
w_6 = MKPOL([w_6_verts,w_6_cells,None])
# assemble internal walls
int_walls = STRUCT([w_1_2,w_3,w_4_5,w_6])

# wardrobe
wrdb = PROD([QUOTE([-8-16.5,1]),QUOTE([-0.74,4.45])])

# 3D ASSEMBLY
floor1_base_3D = COLOR(P_GRAY)(PROD([floor1_base,QUOTE([-1.5,0.4])]))
floor1_tiles_3D = COLOR(P_BROWN)( T(3)(1.9)(floor1_tiles_3D))
columns_f1_3D = COLOR(P_DGRAY)(PROD([columns_f1,Q(6.3)]))
int_walls_3D = COLOR(P_WOOD)(PROD([int_walls,QUOTE([-1.9,4])]))
wrdb_3D = COLOR(P_DWOOD)(PROD([wrdb,QUOTE([-1.9,3])]))
floor1_3D = STRUCT([floor1_base_3D, floor1_tiles_3D ,columns_f1_3D,int_walls_3D, wrdb_3D ])

"""
ROOF
"""

# roof parts
roof_p1 = PROD([Q(28),Q(10.35)])
roof_p2 = T([1,2])([-0.1,-0.1])(PROD([Q(28+0.2),Q(10.35+0.2)]))

# 3D ASSEMBLY
roof_p1_3D = COLOR(P_GRAY)(PROD([roof_p1,QUOTE([-5.9,0.4])]))
roof_p2_3D = COLOR(P_DGRAY)(PROD([roof_p2,QUOTE([-6.3,0.2])]))
roof_3D = STRUCT([roof_p1_3D,roof_p2_3D])

"""
3D ASSEMBLY
"""

house_model_3D = STRUCT ([floor0_3D, 
	T([1,2])([8-c_size/2,8.15+c_size])(floor1_3D),
	T([1,2,3])([8-c_size/2,8.15+c_size,0])(roof_3D)])

# VIEW(house_model_3D)