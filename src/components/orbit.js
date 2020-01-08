import React, { Component } from 'react'
import * as THREE from 'three'

import '../styles/orbit.css'

const geom = new THREE.IcosahedronGeometry(2, 1)
const geom2 = new THREE.IcosahedronGeometry(5, 1)
const geometry = new THREE.TetrahedronGeometry(2, 0)

const mat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
})

const planet = new THREE.Mesh(geom, mat)
const electron = new THREE.Mesh(geom2, mat)
const circle = new THREE.Object3D()
const particle = new THREE.Object3D()

const clock = new THREE.Clock()

class Orbit extends Component {
  componentDidMount() {
    // const width = this.mount.clientWidth
    // const height = this.mount.clientHeight
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1)
    // this.renderer.setSize(width, height)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false
    this.renderer.setClearColor(0x000000, 0.0)
    this.mount.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.z = 400

    this.scene.add(circle)
    this.scene.add(particle)

    for (let i = 0; i < 25; i++) {
      const mesh = new THREE.Mesh(geometry, mat)
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
      mesh.position.multiplyScalar(90 + (Math.random() * 50))
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      particle.add(mesh)
    }

    planet.scale.x = 16
    planet.scale.y = 16
    planet.scale.z = 16
    circle.add(planet)
    circle.add(electron)
    electron.position.set(-100, 100, 0)

    const ring = new THREE.RingGeometry( 5, 4.5, 30 )
    const ring2 = new THREE.RingGeometry( 6, 5.8, 30 )
    const material = new THREE.MeshLambertMaterial({
      color: 0xE7DCDC,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    })
    const mesh = new THREE.Mesh( ring, material )
    const mesh2 = new THREE.Mesh( ring2, material )
    planet.add( mesh )
    planet.add( mesh2 )
    mesh.rotation.x = Math.PI / 2

    const lights = []
    lights[0] = new THREE.DirectionalLight( 0xffffff, 1 )
    lights[0].position.set( 1, 0, 0 )
    lights[1] = new THREE.DirectionalLight( 0xffffff, 1 )
    lights[1].position.set( 0.75, 1, 0.5 )
    lights[2] = new THREE.DirectionalLight( 0x11E8BB, 1 )
    lights[2].position.set( -0.75, -1, 0.5 )
    this.scene.add(lights[0])
    this.scene.add(lights[1])
    this.scene.add(lights[2])
    const ambientLight = new THREE.AmbientLight(0x999999 )
    this.scene.add(ambientLight)
    this.animate()
    window.addEventListener('resize', this.onWindowResize, false)
  }

  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate)
    circle.rotation.x -= 0.0020
    circle.rotation.y -= 0.0030
    particle.rotation.x += 0.0000
    particle.rotation.y -= 0.0040
    this.renderer.clear()
    const t = clock.getElapsedTime()
    electron.position.x = Math.sin(1 * t) * -100
    electron.position.y = Math.sin(1 * t) * 100
    electron.position.z = Math.cos(1 * t) * 100

    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render(){
    return(
      <div className="orbit-wrapper" ref={(mount) => { this.mount = mount }} />
    )
  }
}

export default Orbit
