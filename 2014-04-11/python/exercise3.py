from exercise2 import *
from larcc import *

"""
LAR FUNCTIONS
"""

# Translates points of a model, adding 3rd dimension if necessary
# author: Stefano Russo
def translateModel(model,tvect):
	V,CV = model
	# add 3rd dimension to points if necessary
	if len(V[0])==2 and len(tvect)==3:
		V = AA ( lambda x: x+[0.0] ) (V)
	# add 3rd dimension to tvect if necessary
	if len(V[0])==3 and len(tvect)==2:
		tvect = tvect+[0]
	V = translatePoints(V,tvect)
	return V,CV

# Unifies models of the list, giving a single model
# author: Stefano Russo
def larStruct(model_list):
	finalV=[]
	finalCV=[]
	count=0
	for m in model_list:
		finalV=finalV+m[0]
		tempCV = AA(AA(lambda x: x+count))(m[1])
		finalCV=finalCV+tempCV
		count = count + len(m[0])
	return finalV,finalCV

# Multiplies a lar model, giving new lar model composed by all sub-models
# author: Stefano Russo
def multiply(n,tvect,model):
	oldV,oldCV=model
	# transform points from integer to float
	oldV = AA(AA (lambda x: float(x))) (oldV)
	# add 3rd dimension to points if necessary
	if len(oldV[0])==2 and len(tvect)==3:
		oldV = AA ( lambda x: x+[0.0] ) (oldV)
	# add 3rd dimension to tvect if necessary
	if len(oldV[0])==3 and len(tvect)==2:
		tvect = tvect+[0]
	newV = oldV
	newCV = oldCV
	# each iteration multiplies the model
	for i in range(1,n):
		# translate points of "tvect*i"
		newV = newV + translatePoints(oldV, AA(lambda x: x*i)(tvect))
		# create new cells, related to above points
		newCV = newCV + AA(AA(lambda x: x+(len(oldV)*i)))(oldCV)
	return newV,newCV

"""
GRASS
"""

grass = COLOR(P_GREEN)(CUBOID([250,250,0.5]))

"""
NEAR BUILDINGS
"""
# building 1
building1_base = larIntervals([1,1,1])([50,30,20])
building1_roof_1 = translateModel( larIntervals([1,1,1])([52,32,1]) , [-1,-1,20] )
building1_roof_v = [ [-1,-1,21],[51,-1,21],[51,31,21],[-1,31,21],[10,15,27],[40,15,27] ]
building1_roof_c = [ [0,1,5,4],[1,2,5],[2,3,4,5],[3,0,4] ]
building1 = larStruct([building1_base,building1_roof_1,(building1_roof_v,building1_roof_c)])

# silos
silo_base = larRod((10,50))()
silo_top = translateModel(larSphere(10)(),[0,0,50])
silo = larStruct([silo_base,silo_top])
silo = translateModel(silo,[-5,110])
silos = multiply(3,[25,0],silo)
silos = multiply(2,[0,25],silos)

# near buildings assembly
near_buildings = COLOR(P_SBROWN)(STRUCT(MKPOLS(building1) + MKPOLS(silos)))

"""
ROAD
"""

# asphalt
asphalt = COLOR(BLACK)(CUBOID([250,20,0.05]))

# sidewalk
sidewalk = T(2)(0.25)(CUBOID([250,5,0.01]))

# road assembly
road = STRUCT([sidewalk, 
	T(2)(25.5)(sidewalk),
	T(2)(5.5)(asphalt)])

# pathway
pathway = T([1,2])([11.5,-19])(CUBOID([3.5,17,0.05]))

"""
AREA ASSEMBLY
"""

area_model = STRUCT([ T(2)(20)(road),
	T([1,2,3])([140,80]) (S([1,2,3])([1.5,1.5,1.5])(pathway)),
	T([1,2,3])([30,80]) (S([1,2,3])([1.5,1.5,1.5])(pathway)),
	T([1,2,3])([140,80,-0.2])( S([1,2,3])([1.5,1.5,1.5])(house_model_3D)),
	T(3)(-0.5)(grass),
	T([1,2])([35,80]) (near_buildings)])

VIEW(area_model)