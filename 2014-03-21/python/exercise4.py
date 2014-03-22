from exercise3 import *

# STEP

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

double_stairs = STRUCT(NN(2)([stairs,  T([2,3]) ([8.15+c_size,0.8])  ]))

solid_model_3D = STRUCT([ solid_model_3D, double_stairs])

VIEW(solid_model_3D)