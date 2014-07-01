# NOTA: tutti i moduli di larcc sono stati inseriti nella relativa cartella
# 	di python. Oltre a questi e' stato aggiunto il file "__init__.py"
# 	per effettuare automaticamente gli import. 

from larcc import *

iw = 0.1 # internal wall
ew = 0.2 # external wall
P_SBROWN= Color4f([0.83, 0.8, 0.6, 1.0])
P_GREEN = Color4f([0.05, 0.6, 0.08, 1.0])
P_DGREEN = Color4f([0.06, 0.25, 0, 1.0])
P_DGRAY	= Color4f([0.6, 0.6, 0.6, 1.0])
glass_material = [0.1,0.2,0.3,1,  0,0,0,0.5,  2,2,2,1, 0,0,0,1, 100]
water_material = [0.05,0.4,0.4,1,  0,0.3,0.3,0.5,  2,2,2,1, 0,0,0,1, 100]

"""
FUNCTIONS
"""

# Draws (VIEW) diagram with cells numbering
def drawNumDiagram(diagram,color,dim):
	V,CV = diagram
	diagram_hpc = SKEL_1(STRUCT(MKPOLS(diagram)))
	VIEW(cellNumbering(diagram,diagram_hpc)(range(len(CV)),color,dim))

# Draws (VIEW) diagram solid
def drawDiagram(diagram):
	VIEW(COLOR(P_SBROWN)(STRUCT(MKPOLS(diagram))))

# Removes cells from diagram
def removeCells(diagram,cells_tr):
	V,CV = diagram
	return V,[cell for k,cell in enumerate(CV) if not (k in cells_tr)]

# Switches diagram's axis. "axis": new axis vector.
# Ex:  switchAxis(diagram,[1,0,2]) -> switches axis x and y
def switchAxis(diagram,axis):
	V,CV = diagram
	return AA(lambda x:[x[axis[0]],x[axis[1]],x[axis[2]]])(V),CV

# Inserts "diagram" into the cells ("targetCells") of a "master" diagram.
# The original diagram is corrected, removing cells present in "cellsToRemove".
def insertDiagramIntoCells(diagram,cellsToRemove,master,targetCells):
	new_diagram = removeCells(diagram,cellsToRemove)
	targetCells.sort()
	for i in xrange(len(targetCells)):
		master = diagram2cell(new_diagram,master,targetCells[i]-i)
	return master


""" FULL APARTMENT AND MAIN REFINEMENTS """

apartment = assemblyDiagramInit([7,5,2])([[ew,6,iw,3.6+iw+7,iw,4,ew],[ew,8,iw,10,ew],[0.3,3]])
# drawNumDiagram(apartment,GREEN,2)

refine1 = assemblyDiagramInit([1,3,1])([[3.6+iw+7],[3,iw,6.8],[3]])
apartment = diagram2cell(refine1,apartment,37)
# drawNumDiagram(apartment,GREEN,1)

refine2 = assemblyDiagramInit([3,1,1])([[3.6,iw,7],[6.8],[3]])
apartment = diagram2cell(refine2,apartment,71)
# drawNumDiagram(apartment,GREEN,1)

# apartment = removeCells(apartment,[17,71,73,69,56,54,13,33,52])
# drawNumDiagram(apartment,GREEN,1)
# drawDiagram(apartment)

""" WALLS: WINDOWS AND DOORS """

# hallway - north
hw_n = assemblyDiagramInit([5,1,2])([[0.3,1.5,2.5,1.5,5],[iw],[2.5,0.5]])
apartment = diagram2cell(hw_n,apartment,70)
# drawNumDiagram(apartment,GREEN,1)

# hallway - south
hw_s = assemblyDiagramInit([5,1,2])([[0.3,1.5,6.4,1.5,1.1],[iw],[2.5,0.5]])
apartment = diagram2cell(hw_s,apartment,35)
# drawNumDiagram(apartment,GREEN,1)

# hallway - east and west
hw_e_w = assemblyDiagramInit([1,3,2])([[iw],[0.7,1.4,7.9],[2.5,0.5]])
apartment = diagram2cell(hw_e_w,apartment,27)
apartment = diagram2cell(hw_e_w,apartment,44)
# drawNumDiagram(apartment,GREEN,1)

# entry - north
ent_n = assemblyDiagramInit([3,1,2])([[1,1.8,1.2],[ew],[2.5,0.5]])
apartment = diagram2cell(ent_n,apartment,55)
# drawNumDiagram(apartment,GREEN,1)

# entry - south
ent_s = assemblyDiagramInit([3,1,3])([[1.1,1.8,1.1],[ew],[1,1.5,0.5]])
apartment = diagram2cell(ent_s,apartment,47)
# drawNumDiagram(apartment,GREEN,1)

# livingroom - south
lr_s = assemblyDiagramInit([3,1,3])([[5.5,2.8,2.5],[ew],[1,1.5,0.5]])
apartment = diagram2cell(lr_s,apartment,30)
# drawNumDiagram(apartment,GREEN,1)

# bedroom1 - east
br1_e = assemblyDiagramInit([1,3,2])([[iw],[6,1.5,0.5],[2.5,0.5]])
apartment = diagram2cell(br1_e,apartment,23)
# drawNumDiagram(apartment,GREEN,1)

# bedroom1 - south
br1_s = assemblyDiagramInit([3,1,3])([[2.5,1.8,1.7],[ew],[1,1.5,0.5]])
apartment = diagram2cell(br1_s,apartment,11)
# drawNumDiagram(apartment,GREEN,1)

# bedroom2 - west
br2_w = assemblyDiagramInit([1,3,3])([[ew],[2,1.8,6.2],[1,1.5,0.5]])
apartment = diagram2cell(br2_w,apartment,7)
# drawNumDiagram(apartment,GREEN,1)

# kitchen - north
kt_n = assemblyDiagramInit([5,1,3])([[1.5,1,2.4,1.8,3],[ew],[1,1.5,0.5]])
apartment = diagram2cell(kt_n,apartment,32)
drawNumDiagram(apartment,GREEN,1)

# # WINDOW - TYPE 1
# wnd1 = assemblyDiagramInit([1,3,1])([[1.8],[0.1,0.2,0.1],[1.5]])
# wnd1_p2 = assemblyDiagramInit([5,1,3])([[0.1,0.75,0.1,0.75,0.1],[0.2],[0.1,1.3,0.1]])
# wnd1 = diagram2cell(wnd1_p2,wnd1,1)
# apartment = insertDiagramIntoCells(wnd1,[0,1,6,12],apartment,[96,120,144,105])
# apartment = insertDiagramIntoCells(switchAxis(wnd1,[1,0,2]),[0,1,6,12],apartment,[126])
# # drawNumDiagram(apartment,GREEN,1)

# # WINDOW - TYPE 2
# wnd2 = assemblyDiagramInit([1,3,1])([[1],[0.1,0.2,0.1],[1.5]])
# wnd2_p2 = assemblyDiagramInit([5,1,5])([[0.1,0.35,0.1,0.35,0.1],[0.2],[0.1,0.6,0.1,0.6,0.1]])
# wnd2 = diagram2cell(wnd2_p2,wnd2,1)
# apartment = insertDiagramIntoCells(wnd2,[0,1,10,20,8,18],apartment,[134])
# # drawNumDiagram(apartment,GREEN,1)

# # DOORS
# door = assemblyDiagramInit([1,3,1])([[1.5],[0.1,0.05,0.1],[2.5]])
# apartment = insertDiagramIntoCells(door,[0,2],apartment,[88,66,56,60,70])
# apartment = insertDiagramIntoCells(switchAxis(door,[1,0,2]),[0,2],apartment,[72,78,105])
# # drawNumDiagram(apartment,GREEN,1)

wndChain = [105,114,129,138,147,153]
doorChain = [97,91,79,75,121,85,65,69]
emptyChain = [47,45,43,28,11,59,60,62,15]

# apartment = removeCells(apartment,wndChain+doorChain+emptyChain)


''' Facets extraction of a block diagram '''
def extractFacets(master, emptyChain=[]):
	solidCV = [cell for k,cell in enumerate(master[1]) if not (k in emptyChain)]
	exteriorCV =  [cell for k,cell in enumerate(master[1]) if k in emptyChain]
	exteriorCV += exteriorCells(master)
	CV = solidCV + exteriorCV
	V = master[0]
	FV = [f for f in larFacets((V,CV),3,len(exteriorCV))[1] if len(f) >= 4]
	BF = boundaryCells(solidCV,FV)
	boundaryFaces = [FV[face] for face in BF]
	B_Rep = V,boundaryFaces
	return B_Rep

''' Exports a model (V,FV) into an .obj format file at 'filePath' '''
def objExporter((V,FV), filePath):
	out_file = open(filePath,"w")
	out_file.write("# List of Vertices:\n")
	for v in V:
		out_file.write("v")
		for c in v:
			out_file.write(" " + str(c))
		out_file.write("\n")
	out_file.write("# Face Definitions:\n")
	for f in FV:
		out_file.write("f")
		for v in f:
			out_file.write(" " + str(v+1))
		out_file.write("\n")
	out_file.close()

''' Rimuove dalla lista dei vertici i vertici non effettivamente 
	utilizzati per la definizione delle celle '''
def clearUnusedVertices((V,CV)):
	UV = [v for cell in CV for v in cell]
	UnV = [k for k,vert in enumerate(V) if k not in UV]
	for cell in CV:
		for i in range(len(cell)):
			c = 0
			for v in UnV:
				if cell[i] > v:
					c += 1
			cell[i] -= c
	V = [vert for k,vert in enumerate(V) if k not in UnV]
	return V,CV

print len(apartment[0])

apartment = clearUnusedVertices(apartment)

print len(apartment[0])