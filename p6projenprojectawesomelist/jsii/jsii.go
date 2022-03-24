// Package jsii contains the functionaility needed for jsii packages to
// initialize their dependencies and themselves. Users should never need to use this package
// directly. If you find you need to - please report a bug at
// https://github.com/aws/jsii/issues/new/choose
package jsii

import (
	_      "embed"

	_jsii_ "github.com/aws/jsii-runtime-go/runtime"

	projen "github.com/projen/projen-go/projen/jsii"
)

//go:embed p6-projen-project-awesome-list-0.1.4.tgz
var tarball []byte

// Initialize loads the necessary packages in the @jsii/kernel to support the enclosing module.
// The implementation is idempotent (and hence safe to be called over and over).
func Initialize() {
	// Ensure all dependencies are initialized
	projen.Initialize()

	// Load this library into the kernel
	_jsii_.Load("p6-projen-project-awesome-list", "0.1.4", tarball)
}
