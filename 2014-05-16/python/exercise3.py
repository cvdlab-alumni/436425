from larcc import *

# Remove cells from diagram
def removeCells(diagram,cells_tr):
	V,CV = diagram
	return V,[cell for k,cell in enumerate(CV) if not (k in cells_tr)]

# Inserts "diagram" into the cells ("targetCells") of a "master" diagram.
# The original diagram is corrected, removing cells present in "cellsToRemove".
def insertDiagramIntoCells(diagram,cellsToRemove,master,targetCells):
	new_diagram = removeCells(diagram,cellsToRemove)
	targetCells.sort()
	for i in xrange(len(targetCells)):
		master = diagram2cell(new_diagram,master,targetCells[i]-i)
	return master