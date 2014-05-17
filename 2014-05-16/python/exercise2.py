from exercise1 import *

"""
FUNCTIONS
"""

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



""" MAIN BUILDING """

building = assemblyDiagramInit([1,2,6])([[44],[19,4.2],[0.1,3,3,3,3,0.5]])
# drawNumDiagram(building,GREEN,3)


""" BALCONY """

balcony = assemblyDiagramInit([3,2,3])([[0.2,36.8,7],[4,0.2],[0.3,1.5,1.5]])
balcony = removeCells(balcony,[12,13,14,15,16,17,7,8,11,2])
# drawNumDiagram(balcony,GREEN,3)

building = diagram2cell(balcony,building,10)
building = diagram2cell(balcony,building,9)
building = diagram2cell(balcony,building,8)
building = removeCells(building,[7])
# drawNumDiagram(building,GREEN,3)


""" APARTMENTS """

plan = assemblyDiagramInit([2,1,1])([[22,22],[19],[3]])
plan = diagram2cell(larApply(s(-1,1,1))(apartment),plan,1)
plan = diagram2cell(apartment,plan,0)
# drawNumDiagram(plan,GREEN,3)

building = diagram2cell(plan,building,4)
building = diagram2cell(plan,building,3)
building = diagram2cell(plan,building,2)
building = diagram2cell(plan,building,1)
# drawNumDiagram(building,GREEN,3)


""" STAIRS """

# single step
p1_V = [[0.16,0.10],[0.21,0.10],[0,0.3],[0.16,0.3],[0.21,0.3],[0.5,0.3],[0,0.4],[0.5,0.4]]
p1_FV = [[0,1,3,4,0],[2,3,4,5,7,6,2]]
p2_V = [[0,-0.05],[0,0],[0.5,0.3],[0.5,0.25]]
p2_FV = [[0,1,2,3]]
step = larStruct([(p1_V,p1_FV),(p2_V,p2_FV)])

# step 3D
mod_1d = [[0.0],[-2.0]],[[0,1]]
step_3D = rotateModel(larModelProduct([step,mod_1d]),(0,0,PI/2))

# embedding stairs in building
ramp1 = multiply(5,[0.5,0,0.3],step_3D)
ramp2 = translateModel(rotateModel(ramp1,(PI,0,0)),[2.5,0,1.5])
flat = larIntervals([1,1,1])([1.5,4,0.05])
flat = translateModel(flat,[2.5,-2,1.45])

# three ramps
full_ramp = translateModel(larStruct([ramp1,ramp2,flat]),[37,21,0.05])
ramps = multiply(3,[0,0,3.05],full_ramp)

# complete building
full_building = COLOR(P_SBROWN)(STRUCT( MKPOLS(building) + MKPOLS(ramps) ))

VIEW(full_building)

