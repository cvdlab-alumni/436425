from pyplasm import *

"""
COLUMN
"""

c_size = 0.27
c_width = c_size/11
column_p1 = STRUCT(NN(2)([ PROD([Q(c_size),Q(c_width)]) ,T(2)(c_size-c_width)]))
column_p2 = PROD([QUOTE([-c_size/2+c_width/2,c_width]), QUOTE([-c_width,c_size-c_width*2,-c_width])])
column =  (STRUCT([column_p1,column_p2]))

"""
LOWER TERRACE (floor0)
"""

# floor0 - base and tiles
floor0_base = PROD([Q(20),Q(8.15)])
floor0_tiles = PROD([QUOTE([-0.05,19.90,-0.05]),QUOTE([-0.05,8.05,-0.05])])

# duplicating columns: front/rear column rows
column_row1_f0 = STRUCT(NN(3)([ T([1,2])([2-c_size/2,-c_size])(column) , T(1)(8)]))
column_row2_f0 = STRUCT(NN(2)([ T([1,2])([10-c_size,8.15])(column) , T(1)(8)]))
columns_f0 = STRUCT([column_row1_f0,column_row2_f0])

# assembling floor0
floor0 = STRUCT([floor0_base,T(3)(0.001)(COLOR(BROWN)(floor0_tiles)),COLOR(GREEN)(columns_f0)])


"""
UPPER TERRACE + ROOMS (floor1)
"""

# floor1 - base and tiles
floor1_base = PROD([Q(28),Q(10.35)])
floor1_tiles = PROD([QUOTE([-0.05,27.90,-0.05]),QUOTE([-0.05,10.25,-0.05])])

# duplicating columns: front/rear column rows
column_row1_f1 = STRUCT(NN(4)([T([1,2])([2-c_size/2,-c_size])(column),T(1)(8)]))
column_row2_f1 = STRUCT(NN(2)([ column_row1_f1 , T(2)(10.35+c_size)]))
columns_f1 = STRUCT([column_row1_f1,column_row2_f1])

# external walls
w_width = 0.1
# sud,north,west wall
s_wall = PROD([QUOTE([-8,20]),Q(w_width)])
n_wall = PROD([QUOTE([-8,20]),QUOTE([-10.35+w_width,w_width])])
w_wall = PROD([QUOTE([-28+w_width,w_width]),Q(10.35)])
# east wall - door
e_wall_full = PROD([QUOTE([-8,w_width]),Q(10.35)])
e_door = PROD([QUOTE([-8,w_width]),QUOTE([-3.7,2.6,-4.07])])
e_wall = DIFFERENCE([e_wall_full,e_door])
#assembling walls
ext_walls = STRUCT([s_wall,n_wall,w_wall,e_wall])

# assembling floor1
floor1 = STRUCT([floor1_base,T(3)(0.001)(COLOR(BROWN)(floor1_tiles)),COLOR(GREEN)(columns_f1),T(3)(0.002)(COLOR(RED)(ext_walls)) ])

VIEW(floor1)

two_and_half_model = STRUCT([floor0,T([1,2,3])([8-c_size/2,8.15+c_size,4])(floor1)])

# VIEW(two_and_half_model)