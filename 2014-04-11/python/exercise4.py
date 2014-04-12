from exercise3 import *

"""
LAR FUNCTIONS
"""

# Generates 3D fence
# author: Stefano Russo
def generateFence(n,tot_length,height,width):
	single_length = tot_length/float(n)
	rod = larRod((width*1.5,height))([10,1])
	rod1 = translateModel(rod,[single_length/4.0,0])
	rod2 = translateModel(rod,[single_length-single_length/4.0,0])
	bar = translateModel(larIntervals([1,1,1])([single_length,width,width*4.0]),[0,-width*2.5])
	bar1 = translateModel(bar,[0,0,height/4.0])
	bar2 = translateModel(bar,[0,0,height*0.75])
	fence = larStruct([rod1,rod2,bar1,bar2])
	return multiply(n,[single_length,0],fence)

# Rotate Model in 3D
def rotateModel(model, angles):
	points,cells = model
    # euler angles ax, ay and az are about axes z, y, x respectively
	ax,ay,az = angles
    # axis z
	points1 = [[x*COS(ax)-y*SIN(ax), x*SIN(ax)+y*COS(ax), z] for x,y,z in points]
    # axis y
	points2 = [[x*COS(ay)+z*SIN(ay), y, -x*SIN(ay)+z*COS(ay)] for x,y,z in points1]
    # axis x
	points3 = [[x, y*COS(az)-z*SIN(az), y*SIN(az)+z*COS(az)] for x,y,z in points2]
	return points3,cells

# Generate simple tree
# author: Stefano Russo
def generateTree(r,height):
	trunk = larRod((r/5.0,height*0.75))()
	foliage = translateModel(larBall(r)(),[0,0,height*0.75])
	return STRUCT(AA(COLOR(P_DBROWN))(MKPOLS(trunk))+AA(COLOR(GREEN))(MKPOLS(foliage)))

# Half Torus
# author: Prof. Paoluzzi
def larHalfTorus(params):
   r,R = params
   def larHalfTorus0(shape=[24,36,1]):
      domain = larIntervals(shape)([2*PI,PI,r])
      V,CV = domain
      x = lambda V : [(R + p[2]*COS(p[0])) * COS(p[1]) for p in V]
      y = lambda V : [(R + p[2]*COS(p[0])) * SIN(p[1]) for p in V]
      z = lambda V : [-p[2] * SIN(p[0]) for p in V]
      mapping = [x,y,z]
      return larMap(mapping)(domain)
   return larHalfTorus0

"""
GARDEN
"""

# pool
pool = T([1,2,3])([180,70,-4])(CUBOID([25,15,4.8]))
grass = COLOR(P_GREEN)(DIFFERENCE([grass,pool]))
water = T([1,2,3])([180.25,70.25,-3.5])(CUBOID([24.5,14.5,4.3]))
pool = STRUCT([DIFFERENCE([pool,water]),MATERIAL(water_material)(S(3)(0.6)(water))])

# pathway
pathway = generateTiles([5.25,25.5],[3,17],0.07,0.6)

# garden assembly
garden = STRUCT([T([1,2,3])([157.3,51])(pathway),T([1,2,3])([40,51])(pathway),pool])

"""
FENCES
"""

fence1 = generateFence(15,40,3,0.08)
fence2 = translateModel(generateFence(42,112,3,0.08),[45.5,0])
fence3 = translateModel(generateFence(33,87,3,0.08),[162.5,0])
fence4 = translateModel(rotateModel(generateFence(32,85,3,0.08),(PI/2,0,0)),[110,-0.12])
fence5 = translateModel(rotateModel(generateFence(94,250,3,0.08),(PI,0,0)),[250,84.76])

fences = COLOR(P_DWOOD)(STRUCT(MKPOLS(larStruct([fence1,fence2,fence3,fence4,fence5]))))

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

"""
TREES
"""

tree1 = generateTree(18,40)
tree2 = T([1,2])([157,-8])(generateTree(10,33))
tree3 = T([1,2])([195,-2])(generateTree(10,38))
tree4 = T([1,2])([190,100])(generateTree(15,40))
tree5 = T([1,2])([130,80])(generateTree(10,45))
tree6 = T([1,2])([200,35])(generateTree(6,25))
tree7 = T([1,2])([150,120])(generateTree(15,45))

trees = STRUCT([tree1,tree2,tree3,tree4,tree5,tree6,tree7])

"""
STREET LAMPS
"""
# street lamp
sl_p1 = larRod((0.3,10))([15,1])
sl_p2 = rotateModel( larHalfTorus((0.3,3))([15,20,1]),(0,0,PI/2))
sl_p2 = translateModel(sl_p2,[3,0,10])
sl_p3_v = [ [0.,0.,0.],[1.5,0.,0.],[1.5,1.,0.],[0.,1.,0.],[0.3,0.3,0.8],[0.6,0.3,0.8],[0.6,0.6,0.8],[0.3,0.6,0.8]]
sl_p3_c = [[0,1,2,3,4,5,6,7]]
sl_p3 = translateModel((sl_p3_v,sl_p3_c),[5.5,-0.5,9.5])
street_lamp=rotateModel(larStruct([sl_p1,sl_p2,sl_p3]),(PI/2,0,0))

# multiply street lamp
street_lamps = COLOR(P_DGRAY)(STRUCT(MKPOLS(multiply(6,[48,0],street_lamp))))

"""
OTHER OBJECTS
"""

# table
tb_p1 = larRod((0.1,1.6))([15,1])
tb_down = multiply(2,[0,1.3], multiply(2,[3,0],tb_p1))
tb_top = translateModel(larIntervals([1,1,1])([3.4,1.7,0.2]),[-0.2,-0.2,1.6])
table = COLOR(P_DWOOD)(STRUCT(MKPOLS(larStruct([tb_down,tb_top]))))

# bus stop
bs_p1 = larRod((0.1,5))([15,1])
bs_p2 = translateModel(larIntervals([1,1,1])([0.3,2.4,2]),[-0.15,-1.2,5])
bus_stop = STRUCT(AA(COLOR(P_GRAY))(MKPOLS(bs_p1))+AA(COLOR(YELLOW))(MKPOLS(bs_p2)))

# bus shelter
bsh_p1 = R([2,3])(PI/2)(build_window_3D(0.1)(15)(7))
bsh_p2 = R([1,2])(PI/2)(R([2,3])(PI/2)(build_window_3D(0.1)(5)(7)))
bsh_top = T([1,2,3])([-0.5,-0.5,7])(CUBOID([16,6,0.3]))
bsh_floor = CUBOID([15,5,0.1])
bus_shelter = STRUCT([
	T(3)(0.1)(bsh_p1),
	T(3)(0.1)(bsh_p2),
	T([1,3])([14.9,0.1])(bsh_p2),
	COLOR(P_GRAY)(T(3)(0.1)(bsh_top)),
	COLOR(P_GRAY)(bsh_floor)])

# assemble objects
objects = STRUCT([T([1,2])([220,90])(S([1,2,3])([1.8,1.8,1.2])(table)),
	T([1,2,3])([167,94,2.3])(S([1,2,3])([1.6,1.6,1.2])(table)),
	T([1,2])([140,46])(bus_stop),
	T([1,2])([90,25])(bus_stop),
	T([1,2])([80,15])(bus_shelter)])

"""
AREA ASSEMBLY
"""

area_model = STRUCT([garden, objects,
	T(3)(-0.5)(grass),
	T([1,2,3])([140,80,-0.2])( S([1,2,3])([1.5,1.5,1.5])(house_model_3D)),
	T([1,2])([35,80]) (near_buildings),
	T(2)(20)(road),
	T(2)(52)(fences),
	T([1,2])([15,70])(trees),
	T([1,2])([5,18])(street_lamps)])
	

VIEW(area_model)