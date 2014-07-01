def vertsCenter(verts):
	countX = 0.0
	countY = 0.0
	countZ = 0.0
	for v in verts:
		countX += v[0]
		countY += v[1]
		if len(v)==3:
			countZ += v[2]
	return [countX/len(verts),
			countY/len(verts),
			countZ/len(verts)]

# v = [1,2,3,4,5,6]
# for x in v[:len(v)-1]:
# 	print(x)


def larToObj(larM):
	V, FV = larM
	V = [[float(x) for x in point] for point in V]
	objF = ""
	for face in FV:
		if (len(face)>1):
			f_verts = []
			for vert_index in face:
				f_verts += [V[vert_index]]
			center = vertsCenter(f_verts)
			for i in xrange(0,len(face)-1):
				objF += "f " + str(face[i]+1)+" "+str(face[i+1]+1)+" "+str(len(V)+1)+"\n"
			objF += "f " + str(face[i+1]+1)+" "+str(face[0]+1)+" "+str(len(V)+1)+"\n"
			V += [center]
	objF += "\n"
	objV = ""
	for vertex in V:
		if len(vertex)==2:
			objV += "v "+str(vertex[0])+" "+str(vertex[1])+" 0.0\n"
		else:
			objV += "v "+str(vertex[0])+" "+str(vertex[1])+" "+str(vertex[2])+"\n"
	return objV + objF

	


		# verts = 
		# objV += "f "
		# for vert_index in f:
		# 	objV += str(vert_index)+" "
		# objV += "\n"
	# return objV

# example

FV = [[0,1,2,3]]

V = [[0,0],[0,1],[1,0],[1,1]]

l = larToObj([V, FV])

print(l)