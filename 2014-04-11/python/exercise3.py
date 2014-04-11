from exercise2 import *
from larcc import *

"""
GRASS
"""

grass = COLOR(P_GREEN)(CUBOID([250,250,0.5]))

"""
GARDEN
"""
# pathway
pathway = T([1,2])([11.5,-19])( generateTiles([3.5,17],[3,17],0.05,0.4) )

# garden assembly
garden = STRUCT([pathway])

"""
ROAD
"""
# asphalt
asphalt = COLOR(BLACK)(CUBOID([250,20,0.05]))

# sidewalk
sidewalk_edge_2D = JOIN(POLYLINE([ [0,0],[0.25,0],[0.25,0.19],[0.19,0.25],[0.06,0.25],[0,0.19] ]))
sidewalk_edge = R([1,2])(PI/2)(R([2,3])(PI/2)(PROD([sidewalk_edge_2D,Q(250)])))
sidewalk_edges = STRUCT(NN(2)([sidewalk_edge,T(2)(5.25)]))
sidewalk_tiles = T(2)(0.25)(generateTiles([250,5],[250,6],0.15,0.1))
sidewalk = STRUCT([sidewalk_edges,sidewalk_tiles,T(2)(0.25)(CUBOID([250,5,0.01]))])

# lines
continuous_line = CUBOID([250,0.5])
dashed_line = STRUCT( NN(25)([CUBOID([5,0.5]),T(1)(10)]) )

lines = COLOR(WHITE) (T(3)(0.051) (STRUCT([continuous_line,(T)(2)(17.5)(continuous_line),T(2)(8.75)(dashed_line)])) )

# road assembly
road = STRUCT([sidewalk, T(2)(25.5)(sidewalk),
	T(2)(5.5)(asphalt),
	T(2)(6.5)(lines)])






model= STRUCT([ T(2)(80)(road),
	T([1,2,3])([140,140]) (S([1,2,3])([1.5,1.5,1.5])(garden)),
	T([1,2,3])([140,140,-0.2])( S([1,2,3])([1.5,1.5,1.5])(house_model_3D)),
	T(3)(-0.5)(grass)])

VIEW(model)