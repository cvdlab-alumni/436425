from pyplasm import *

"""
COLUMN
"""

c_size = 0.27
c_width = c_size/10
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

# assemble floor0
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

# EXTERNAL WALLS
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

# assemble floor1
floor1 = STRUCT([floor1_base,T(3)(0.001)(COLOR(BROWN)(floor1_tiles)),COLOR(RED)(columns_f1),
	T(3)(0.002)(COLOR(CYAN)(ext_walls)),T(3)(0.002)(COLOR(BLUE)(int_walls)),T(3)(0.002)(COLOR(MAGENTA)(wrdb))])

"""
ROOF
"""

# roof parts
roof_p1 = PROD([Q(28),Q(10.35)])
roof_p2 = T([1,2])([-0.1,-0.1])(PROD([Q(28+0.2),Q(10.35+0.2)]))
# duplicate columns: front/rear column rows
column_row1_r = STRUCT(NN(4)([T([1,2])([2-c_size/2,-c_size])(column),T(1)(8)]))
column_row2_r = STRUCT(NN(2)([column_row1_r,T(2)(10.35+c_size)]))
columns_r = STRUCT([column_row1_r,column_row2_r])
# assemble roof
roof = STRUCT([T(3)(0.001)(roof_p1),COLOR(BROWN)(roof_p2),T(3)(0.001)(COLOR(RED)(columns_r))])

"""
2.5D MODEL
"""

two_and_half_model = STRUCT([floor0,T([1,2,3])([8-c_size/2,8.15+c_size,10])(floor1),T([1,2,3])([8-c_size/2,8.15+c_size,20])(roof)])

VIEW(two_and_half_model)