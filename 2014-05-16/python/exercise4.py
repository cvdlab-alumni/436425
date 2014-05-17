"""
Solved only the first problem, using function "vertexSieve".
First of all, the target cell "cell" is removed from master's list of cells ("CV1").
Then, it's possible to apply "vertexSieve" to "master" and "diagram", to obtain
the right vertex list, togheter with related cells lists.
"""

def diagram2cell(diagram,master,cell):
   mat = diagram2cellMatrix(diagram)(master,cell)
   diagram =larApply(mat)(diagram)
   V1,CV1 = master
   CV1 = [c for k,c in enumerate(CV1) if k != cell]
   V,CV1,CV2,n12 = vertexSieve((V1,CV1),diagram)
   master = V, CV1+CV2
   return master