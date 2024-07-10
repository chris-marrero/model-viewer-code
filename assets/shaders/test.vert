struct VertexOutput {
    @builtin(position) pos: vec4<f32>,
    @location(0) norm: vec4<f32>,
};

struct Transforms {
  model: mat4x4<f32>,
  normal: mat4x4<f32>,
}

@group(0) @binding(0) var<uniform> transforms: Transforms;

struct VertexInput {
  @location(0) pos: vec4<f32>,
  @location(1) norm: vec4<f32>,
}

@vertex
fn main(
  //@location(0) pos: vec4<f32>,
  // @builtin(vertex_index) in_vertex_index: u32,
  v_in: VertexInput,
) -> VertexOutput {
    var out: VertexOutput;

    out.pos = transforms.model * v_in.pos;
    out.norm = normalize(transforms.normal * v_in.norm);

    return out;

    // var out: VertexOutput;
    // let x = f32(i32(in_vertex_index) - 1);
    // let y = f32(i32(in_vertex_index & 1u) * 2 - 1);
    // out.pos = vec4(x, y, 0.0, 1.0);

    // return out;
}