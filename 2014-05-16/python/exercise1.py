# NOTA: tutti i moduli di larcc sono stati inseriti nella relativa cartella
# 	di python. Oltre a questi e' stato aggiunto il file "__init__.py"
# 	per effettuare automaticamente gli import. 

from larcc import *

iw = 0.2 # internal wall
ew = 0.4 # external wall
P_SBROWN= Color4f([0.83, 0.8, 0.6, 1.0])

# Draw (VIEW) diagram with cells numbering
def drawNumDiagram(diagram,color,dim):
	V,CV = diagram
	diagram_hpc = SKEL_1(STRUCT(MKPOLS(diagram)))
	VIEW(cellNumbering(diagram,diagram_hpc)(range(len(CV)),color,dim))

# Draw (VIEW) diagram solid
def drawDiagram(diagram):
	VIEW(COLOR(P_SBROWN)(STRUCT(MKPOLS(diagram))))

# Remove cells from diagram
def removeCells(diagram,cells_tr):
	V,CV = diagram
	return V,[cell for k,cell in enumerate(CV) if not (k in cells_tr)]

""" FULL APARTMENT AND MAIN REFINEMENTS """

apartment = assemblyDiagramInit([7,5,2])([[ew,6,iw,3.6+iw+7,iw,4,ew],[ew,8,iw,10,ew],[0.4,3]])
# drawNumDiagram(apartment,GREEN,2)

refine1 = assemblyDiagramInit([1,3,1])([[3.6+iw+7],[3,iw,6.8],[3]])
apartment = diagram2cell(refine1,apartment,37)
# drawNumDiagram(apartment,GREEN,1)

refine2 = assemblyDiagramInit([3,1,1])([[3.6,iw,7],[6.8],[3]])
apartment = diagram2cell(refine2,apartment,71)
# drawNumDiagram(apartment,GREEN,1)

apartment = removeCells(apartment,[17,71,73,69,56,54,13,33,52])
# drawNumDiagram(apartment,GREEN,1)
# drawDiagram(apartment)

""" WALLS: WINDOWS AND DOORS """

# hallway - north
hw_n = assemblyDiagramInit([5,1,2])([[0.3,1.5,2.5,1.5,5],[iw],[2.5,0.5]])
apartment = diagram2cell(hw_n,apartment,63)
# drawNumDiagram(apartment,GREEN,1)

# hallway - south
hw_s = assemblyDiagramInit([5,1,2])([[0.3,1.5,6.4,1.5,1.1],[iw],[2.5,0.5]])
apartment = diagram2cell(hw_s,apartment,32)
# drawNumDiagram(apartment,GREEN,1)

# hallway - east and west
hw_e_w = assemblyDiagramInit([1,3,2])([[iw],[0.6,1.5,7.9],[2.5,0.5]])
apartment = diagram2cell(hw_e_w,apartment,42)
apartment = diagram2cell(hw_e_w,apartment,25)
# drawNumDiagram(apartment,GREEN,1)

# entry - north
ent_n = assemblyDiagramInit([3,1,2])([[1,1.8,1.2],[ew],[2.5,0.5]])
apartment = diagram2cell(ent_n,apartment,49)
# drawNumDiagram(apartment,GREEN,1)

# entry - south
ent_s = assemblyDiagramInit([3,1,3])([[1.1,1.8,1.1],[ew],[1,1.5,0.5]])
apartment = diagram2cell(ent_s,apartment,44)
# drawNumDiagram(apartment,GREEN,1)

# livingroom - south
lr_s = assemblyDiagramInit([3,1,3])([[5.5,2.8,2.5],[ew],[1,1.5,0.5]])
apartment = diagram2cell(lr_s,apartment,28)
# drawNumDiagram(apartment,GREEN,1)

# bedroom1 - east
br1_e = assemblyDiagramInit([1,3,2])([[iw],[6,1.5,0.5],[2.5,0.5]])
apartment = diagram2cell(br1_e,apartment,21)
# drawNumDiagram(apartment,GREEN,1)

# bedroom1 - south
br1_s = assemblyDiagramInit([3,1,3])([[2.5,1.8,1.7],[ew],[1,1.5,0.5]])
apartment = diagram2cell(br1_s,apartment,11)
# drawNumDiagram(apartment,GREEN,1)

# bedroom2 - north
br2_n = assemblyDiagramInit([3,1,3])([[2.5,1.8,1.7],[ew],[1,1.5,0.5]])
apartment = diagram2cell(br2_n,apartment,16)
# drawNumDiagram(apartment,GREEN,1)

# kitchen - north
kt_n = assemblyDiagramInit([5,1,3])([[1.5,1,2.4,1.8,3],[ew],[1,1.5,0.5]])
apartment = diagram2cell(kt_n,apartment,29)
# drawNumDiagram(apartment,GREEN,1)

# remove cells of doors and windows
doorsToRemove = [82,112,56,66,60,70,76,88]
windowsToRemove = [96,105,120,129,138,144]
apartment = removeCells(apartment,doorsToRemove+windowsToRemove)

drawDiagram(apartment)